import React from 'react';
import {baseUrl} from '../../constants/baseUrl'
import axios from 'axios';
import { Table, Space } from 'antd';
import 'antd/dist/antd.css';

const HomePage = () => {
  const [data, setData] = React.useState(null)
  const [page, setPage] = React.useState(1)
  const [limitPage, setLimitPage] = React.useState(null)
  const [total, setTotal] = React.useState(null)
  const [isSearch, setIsSearch] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState(null)

  React.useEffect(() => {
    if(!isSearch) {
      getData(page)
    } else {
      onSearchData(searchValue, page)
    }
  }, [page])

  const onChangePage = (value) => {
    setPage(value.current)
  } 

  const getData =(page) => {
    axios.get(baseUrl+`?page=${page}&apikey=5oIDTjlULgO8`).then((response) => {
      setData(response.data.data)
      setLimitPage(response.data.lastPage)
      setTotal(response.data.lastPage * response.data.numOfResults)
    });
  }

  const onSearchData = (value, page) => {
    axios.get(baseUrl+`/search?term=${value}&page=${page}&limit=5&apikey=5oIDTjlULgO8`).then((response) => {
      setData(response.data.data)
      setLimitPage(5)
      setTotal(response.data.lastPage * 5)
    });
  }

  const onSearch = (event) => {
    event.which = event.which || event.keyCode;
    if(event.which === 13) {
      setIsSearch(true)
      setSearchValue(event.target.value)
      if(event.target.value !== null && event.target.value !== "") {
        onSearchData(event.target.value, page)
    } else {
      setIsSearch(false)
      getData(page)
    }
    }
  }
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Price',
      dataIndex: 'product_price',
      key: 'product_price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <div onClick={() => window.location.href ='/detail'}>Detail</div>
        </Space>
      ),
    },
  ];

  return ( 
    <div style={{margin: '4em'}}>
    <h1>List Data</h1>
    <input text placeholder='search name' onKeyUp={(e) => onSearch(e)} />
    <div style={{marginTop : '2em'}}>
      <Table 
          dataSource={data} 
          columns={columns}
          rowKey={(record) => record._id}
          pagination={{
              total: total,
              current: page,
              pageSize:limitPage,
              responsive: true,
              showLessItems: true,
              showSizeChanger: false,
              style: { paddingRight: 16 }
            }
          }
          onChange= {onChangePage}
          />;
    </div>
    </div>
  )
}

export default HomePage;