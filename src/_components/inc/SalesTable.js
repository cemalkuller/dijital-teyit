import React, { Component ,forwardRef} from "react";
import { ReactSVG } from "react-svg";
import {withRouter,Link,Route} from "react-router-dom";
import { CommonLoading   } from 'react-loadingg';
import MaterialTable from "material-table"; 
import axios from 'axios';
import 'dayjs/locale/tr';
import dayjs from 'dayjs';

import cogoToast from "cogo-toast";
const tableRef = React.createRef();
import {userService} from '../../_services/user.service';
import { authHeader } from '../../_helpers';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ReactSVG    src="./assets/img/icons/filtre.svg" {...props} ref={ref} /> ),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };




class SalesTable extends Component {

    constructor(props) {  
        super(props);
        this.goto = this.goto.bind(this);
        this.state = {
          sales: [],
          isDraft: "all",
          allcats : 'true' ,
          create: { status: false },
          load_detail: false,
          selected_categorys: [],
          value: "",
          url : '',
          loadExcel : false,
          search : '',
          promise :''
        };
        this.download = this.download.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.arama = this.arama.bind(this);
      }

      componentDidUpdate(prevProps) {
   
        if (prevProps.match.params !== this.props.match.params) {
          console.log(this.props.match.params);
          tableRef.current && tableRef.current.onQueryChange();
        }
      }

    goto(e) {
        this.props.history.push(e)

      //  history.push(e);
    }



    handleChange(event) {
      const { name, value } = event.target;
      this.setState({
              search: value
      }),
      this.arama();
  }
  
  
  arama() {
      if (this.state.search) {
        
        if (this.state.promise) clearTimeout(this.state.promise);
  
        this.state.promise = setTimeout(() => tableRef.current && tableRef.current.onQueryChange() , 300);
  
        
      }
  }


    download() {
      this.setState({
        loadExcel: true
      });
        userService.downloadfile("export",this.state.url).then( result =>
            
          {
            console.log(result);
            if (!result.success) {
              cogoToast.warn(
                "Webservis Kaynaklı Sorun Oluşmuştur, Lütfen Sistem Yöneticisine Bilgi Veriniz...",
                { position: "bottom-right" }
              );
            }
            else 
            {
              var format = 'xlsx';
              var linkSource = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'+ result.data ;
              var downloadLink = document.createElement("a");
            
              downloadLink.href = linkSource;
              downloadLink.download = result.filename;
              downloadLink.click();

            }
            this.setState({
              loadExcel: false
            });
          }
          
          );


  }
    



    
  RemoteData = () => {
  
  
 
    return (
      <MaterialTable
        key="Tablom"
        tableRef={tableRef}
        icons={tableIcons}
        options={{
          search: false,
          filtering: false,
          pageSizeOptions: [10, 50, 100, 200],
          pageSize: 10,
          showTitle : false ,
        }}
        localization={{
          pagination: {
            labelDisplayedRows: "{count} sonuçtan {from}-{to} arası sonuçlar",
            labelRowsSelect: "data göster ",
          },
          toolbar: {
            nRowsSelected: "{0} row(s) selected",
            title : false
          },
          header: {
            actions: "İşlem",
          },
          body: {
            emptyDataSourceMessage: "Gösterilecek Data Bulunamadı",
            filterRow: {
              filterTooltip: "Filtre",
            },
          },
        }}
        columns={[
          {
            title: "Adı Soyadı",
            field: "fullname",
            render: (rowData) => (
              <Link  to={"/detail/"+rowData.token}   > <strong>{rowData.fullname}</strong> </Link>
            ),
          },

          {
            title: "Ürün",
            field: "productname",
            render: (rowData) => (
              <div className="table_personel">
              <strong>{rowData.brand}</strong>
              <small>{rowData.productname}</small>
            </div>
            
            ),
          },

          {
            title: "Son Güncelleme",
            field: "update_date",
            render: (rowData) => (
                <small>{dayjs(rowData.update_date).locale('tr').format('DD/MM/YYYY dddd , HH:mm')}</small>
            ),
          },

          {
            title: "Son İşlemi Yapan",
            field: "personel",
            render: (rowData) => (
              <div className="table_personel">
                <strong>{rowData.personel}</strong>
                <small>{rowData.log_time ? dayjs(rowData.log_time).locale('tr').format('DD/MM/YYYY HH:mm') : '-' }</small>
              </div>
              
            ),
          },

          {
            title: "Durum",
            field: "status_name",
            render: (rowData) => (
            
             <strong className="status_table_div" style={{color : rowData.color == '#ffffff' ?  '#26518b' : rowData.color}}>
               <small style={{backgroundColor : rowData.color == '#ffffff' ?  '#26518b' : rowData.color}} className="status_icon"></small>
               <span className="status_table_text">{rowData.status_name}</span>
             </strong>
            ),
          },
          
          {
            title: "İşlem",
            field: "id",
            sorting : false,
            render: (rowData) => (
            
              <Link className="btn btn-primary detay_button" to={"/detail/"+rowData.token}   > DETAY </Link>
            ),
          },

        
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            if (!query.orderDirection) {
              query.orderBy = { field: "id" };
              query.orderDirection = "desc";
            }
           
            let url = "limit=" + query.pageSize;
            url +=
              "&order[" + query.orderBy.field + "]=" + query.orderDirection;
            url += "&page=" + (query.page + 1);
            url += "&status=" + this.props.match.params.id+ '&search='+this.state.search ;
          
            if(this.props.match.params.id === undefined)
            {
              url = "limit=" + query.pageSize;
              url +=
                "&order[" + query.orderBy.field + "]=" + query.orderDirection;
              url += "&page=" + (query.page + 1);
              url += "&status=" + 0 + '&search='+this.state.search ;
            //  this.props.statusis = 0 ;
            }
            this.setState({
              url: url
          });
            userService.getStatus(url).then( result =>
            
              {
                if (result.error) {
                  cogoToast.warn(
                    "Webservis Kaynaklı Sorun Oluşmuştur, Lütfen Sistem Yöneticisine Bilgi Veriniz...",
                    { position: "bottom-right" }
                  );
                }

                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.total,
                });
             
              }
              
              );

          })
        }
      />
    );
  };



    render() {
        const { user , provider,sales } = this.props;
        
          return (      <div className="col-lg-9">
          <div className="card">
          <div className="card-body card-toolbar">
              <div className="Search_Table_Div">
              
              <ReactSVG    src="./assets/img/icons/search.w.svg" height="20px"   className="search_table_icon"/>
             <input className="table_search form-control"  placeholder="Arama Yap" defaultValue={this.state.search} onChange={this.handleChange} />
             </div> 
             <button disabled={this.state.loadExcel} className="export_button" onClick={this.download}>
             {this.state.loadExcel ?<div><i className="fa fa-circle-o-notch  fa-spin"  /> </div>:  <ReactSVG    src="./assets/img/icons/excel.svg" />}
                
             {this.state.loadExcel ? 'Excel Oluşturuluyor' :  "Excel'e Aktar"}
             
             </button>
              </div>
              <div className="row">

                  <div className="col-lg-12">
                  {this.RemoteData()}
                  </div>
              </div>
  
          </div>
        </div>);
 
}
}




export default withRouter(SalesTable);
