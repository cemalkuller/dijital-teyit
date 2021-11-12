import React, { Component, forwardRef } from "react";
import { ReactSVG } from "react-svg";
import { withRouter, Link, Route } from "react-router-dom";
import { CommonLoading } from 'react-loadingg';
import MaterialTable from "material-table";
import axios from 'axios';
import 'dayjs/locale/tr';
import dayjs from 'dayjs';


import Chart from "react-apexcharts";


import cogoToast from "cogo-toast";
const tableRef = React.createRef();
import { userService } from '../../_services/user.service';
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
import $ from 'jquery';

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
  SortArrow: forwardRef((props, ref) => <ReactSVG src="./assets/img/icons/filtre.svg" {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};





class ReportsTable extends Component {

  constructor(props) {
    super(props);
    this.goto = this.goto.bind(this);
    this.state = {
      form: {},
      reportid: this.props.reportid,
      sales: [],
      isDraft: "all",
      allcats: 'true',
      create: { status: false },
      load_detail: false,
      selected_categorys: [],
      value: "",
      url: '',
      loadExcel: false,
      bar: {
        series: [{
          data: []
        }],
        options: {
          chart: {
            type: 'bar',
            height: 500,

            dataLabels: {},
            stroke: {
              width: 20,
              curve: 'smooth',
              dashArray: 20
            },

            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350
              }
            },
            toolbar: {
              show: false
            },
            fontFamily: "Aristotelica Display",
            foreColor: 'rgba(37,78,134,.3)',
          },

          plotOptions: {
            bar: {
              borderRadius: 4,

              horizontal: true,
              fontFamily: "Aristotelica Display",
              foreColor: 'rgba(37,78,134,.3)',

            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: [],
            axisBorder: {
              show: false,
              color: 'rgba(21,209,235,.05)',
              height: 3
            },
            tooltip: {
              enabled: false,
            },
            crosshairs: {
              show: false,
              stroke: {
                color: 'rgba(37,78,134,.7)',
                width: 1,
                dashArray: 2,
              }
            }
          }

        },
      },
      search: '',
      promise: '',
      series: [],
      chartOptions: {
        labels: ["a", "b", "c", "d", "e"]
      }
      ,
      options: {
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        },
        labels: [],
        chart: {

          type: 'donut',
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              labels: {
                show: true,

              }
            }
          }
        },
        dataLabels: {
          enabled: false
        },

        legend: {
          show: false
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }



    };
    this.download = this.download.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.arama = this.arama.bind(this);






    setTimeout(() => {
      $(".apexcharts-text.apexcharts-datalabel-label").text("Toplam");
      $(".apexcharts-text.apexcharts-datalabel-value").text("150");
    }, 500);



  }

  componentDidUpdate(prevProps) {

    if (prevProps.reportid !== this.props.reportid) {
      this.setState({
        form: this.props.form,
        reportid: this.props.reportid
      });
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

      this.state.promise = setTimeout(() => tableRef.current && tableRef.current.onQueryChange(), 300);


    }
  }


  download() {
    this.setState({
      loadExcel: true
    });
    userService.downloadfile("exportReport", this.state.url).then(result => {
      console.log(result);
      if (!result.success) {
        cogoToast.warn(
          "Webservis Kaynaklı Sorun Oluşmuştur, Lütfen Sistem Yöneticisine Bilgi Veriniz...",
          { position: "bottom-right" }
        );
      }
      else {
        var format = 'xlsx';
        var linkSource = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + result.data;
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
      
        <div className="row">

          <div className="col-lg-4">


            <div className="islem_gecmisi">
              <div className="widget_title">Satış Durum Dağılımı </div>

              <div className="n_statics" style={{ height: '300px', display: 'grid', alignItems: 'center' }}>
              {this.state.series.length ? 
                  <Chart options={this.state.options} series={this.state.series} type="donut" height={250} />
                 : <></>}
             
              </div>



            </div>
          </div>
          <div className="col-lg-8">



            <div className="islem_gecmisi">
              <div className="widget_title">Satış Kurumlara Dağılımı</div>
              <div className="n_statics" style={{ height: '300px', display: 'grid', alignItems: 'center' }}>
                {this.state.bar.series.length ? 
                <Chart options={this.state.bar.options} series={this.state.bar.series} type="bar" height={250} />
                 : <></>}
              </div>


            </div>
          </div>
          <div className="col-lg-12">
            <MaterialTable
              key="Tablom"
              tableRef={tableRef}
              icons={tableIcons}

              options={{
                search: false,
                filtering: false,
                pageSizeOptions: [10, 50, 100, 200],
                pageSize: 10,
                showTitle: false,
              }}
              localization={{
                pagination: {
                  labelDisplayedRows: "{count} sonuçtan {from}-{to} arası sonuçlar",
                  labelRowsSelect: "data göster ",
                },
                toolbar: {
                  nRowsSelected: "{0} row(s) selected",
                  title: false
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

                    <strong className="status_table_div" style={{ color: rowData.color == '#ffffff' ? '#26518b' : rowData.color }}>
                      <small style={{ backgroundColor: rowData.color == '#ffffff' ? '#26518b' : rowData.color }} className="status_icon"></small>
                      <span className="status_table_text">{rowData.status_name}</span>
                    </strong>
                  ),
                },

                {
                  title: "İşlem",
                  field: "id",
                  sorting: false,
                  render: (rowData) => (

                    <Link className="btn btn-primary detay_button" to={"/detail/" + rowData.token}   > DETAY </Link>
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


                  for (var key in this.state.form) {
                    url += "&" + key + "=" + this.state.form[key];
                  }

                  this.setState({
                    url: url
                  });


                  userService.getReportsStatus(url).then(result => {

                    const counts = [];
                    const brands = [];

                    const scounts = [];
                    const sstatus = [];

                    var toplam = 0;


                    result.brands.map((datam, i) => {
                      counts.push( parseInt(datam.total));
                   
                      brands.push(datam.brand);
                    });

                    result.status.map((datam, i) => {
                      scounts.push( parseInt(datam.total));
                      toplam = toplam + parseInt(datam.total) ;

                      sstatus.push(datam.status);
                    });

                 
                    this.setState({ series :  scounts });



                    const stateim = this.state.bar;
                    stateim.series = [{ data: counts }];
                   

                    this.setState({
                      options: {
                        ...this.state.options,
                        labels: sstatus
                        },
                      bar : {
                        ...this.state.bar,
                      options: {
                        ...this.state.bar.options,
                        xaxis: {
                          ...this.state.bar.options.xaxis,
                            categories: brands
                          }
                        }
                      }
                      
                    });

                    this.setState({ stateim });
                    
                    
                    
                    setTimeout(() => {
                      $(".apexcharts-text.apexcharts-datalabel-label").text("Toplam");
                      $(".apexcharts-text.apexcharts-datalabel-value").text(toplam);
                    }, 500);

                  });
                  userService.getReports(url).then(result => {
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
          </div>
        </div>
       
    );
  };



  render() {
    const { user, provider, sales } = this.props;

    return (<div className="col-lg-9">
      { this.state.reportid > 0 ?
       
      <div className="card">
        <div className="card-body card-toolbar">
          <div className="Search_Table_Div">

            <ReactSVG src="./assets/img/icons/search.w.svg" height="20px" className="search_table_icon" />
            <input className="table_search form-control" placeholder="Arama Yap" defaultValue={this.state.search} onChange={this.handleChange} />
          </div>
          <button disabled={this.state.loadExcel} className="export_button" onClick={this.download}>
            {this.state.loadExcel ? <div><i className="fa fa-circle-o-notch  fa-spin" /> </div> : <ReactSVG src="./assets/img/icons/excel.svg" />}

            {this.state.loadExcel ? 'Excel Oluşturuluyor' : "Excel'e Aktar"}

          </button>
        </div>
        <div className="row">

          <div className="col-lg-12">
            {this.RemoteData()}
          </div>
        </div>

      </div>
       :  <div className="col-lg-12">
          <h1 className="bosrapor">

          <div className="bos_rep">
          <ReactSVG src="./assets/img/statistics.svg"  className="bosrapor_icon" />
            Rapor Oluşturmak İçin Soldaki Formu Kullanmanız Gerekmektedir.
            </div>
            </h1>
         </div>
         }
    </div>);

  }
}




export default withRouter(ReportsTable);
