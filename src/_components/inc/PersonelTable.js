import React, { Component, forwardRef } from "react";
import { ReactSVG } from "react-svg";
import { withRouter, Link, Route } from "react-router-dom";
import { CommonLoading } from 'react-loadingg';
import MaterialTable from "material-table";
import axios from 'axios';
import 'dayjs/locale/tr';
import dayjs from 'dayjs';

import cogoToast from "cogo-toast";
const tableRef = React.createRef();
import { userService } from '../../_services/user.service';
import { authHeader } from '../../_helpers';

import $ from 'jquery';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 



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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Switch from "react-switch";

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




class PersonelTable extends Component {

    constructor(props) {
        super(props);
        this.goto = this.goto.bind(this);
        this.state = {
            create: { status: false },
            value: "",
            url: '',
            loadExcel: false,
            search: '',
            promise: '',
            usertype : '',
            modalIsOpen: false,
            modalIsOpenNew : this.props.modalIsOpenNew,
            selected_member : {},
            newmember : {konum_kontrol : false , all_sales_view : false , user_type : false},
            
            member_load : false,
            modal_load : false
        };
        this.download = this.download.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSw = this.handleChangeSw.bind(this);
        this.handleChangeSwn = this.handleChangeSwn.bind(this);
        
        this.arama = this.arama.bind(this);
        this.getMember = this.getMember.bind(this);
        this.handleChangeIn = this.handleChangeIn.bind(this);
        this.handleChangeInN = this.handleChangeInN.bind(this);
        
    }

    componentDidUpdate(prevProps) {
  
        if (prevProps !== this.props) {
            tableRef.current && tableRef.current.onQueryChange();
        }
    }

    goto(e) {
        this.props.history.push(e)

        //  history.push(e);
    }
    handleChangeSw(checked , name) {
        console.log(checked , name);
        const stateim = this.state.selected_member;
        stateim[name] = checked;
        this.setState({ stateim });
      }
      handleChangeSwn(checked , name) {
        const stateim = this.state.newmember;
        stateim[name] = checked;
        this.setState({ stateim });
      }
      



      updateMember() {
        this.setState({
            modal_load: true,
        });
        userService.updateMember(this.state.selected_member).then(result => {

            if (!result.success) {
                cogoToast.warn(
                    result.message,
                    { position: "top-center" }
                );
            }
            else {
                tableRef.current && tableRef.current.onQueryChange();
                cogoToast.success(
                    result.message,
                    { position: "top-center" }
                );

            }
            this.setState({
                modal_load: false,
                modalIsOpen : false ,
                selected_member : {}
            });

    
        }
    
        );
    
      }
      

      newMember() {
        this.setState({
            modal_load: true,
        });
        userService.newMember(this.state.newmember).then(result => {

            if (!result.success) {
                cogoToast.warn(
                    result.message,
                    { position: "top-center" }
                );
                this.setState({
                    modal_load: false
                });
            }
            else {
                tableRef.current && tableRef.current.onQueryChange();
                cogoToast.success(
                    result.message,
                    { position: "top-center" }
                );
                this.setState({
                    modal_load: false,
                    modalIsOpenNew : false ,
                    newmember : {}
                });

            }
        

    
        }
    
        );
    
      }

      
    confirmDelete(name, id , status) {
        if(status == 1)
        {
            var message = "Personelin durumunu 'Aktif' etmek istediğinize emin misiniz?" ;
            var label = "Evet, Aktif Yap" ;
        }
        else 
        {
            var message = "Personelin durumunu 'Pasif' etmek istediğinize emin misiniz?" ;
            var label = "Evet, Pasif Yap" ;
        }
       
        confirmAlert({
          title: name,
          message: message,
          buttons: [
            {
              label: label,
              onClick: () =>  {
                status = status == 1 ? 0 : 1 ;
                userService.deleteMember(id , status).then(result =>
                     {
                         if(result.success)
                         {
                            tableRef.current && tableRef.current.onQueryChange();
                         }
                     }
                  );
                
              
              }
            },
            {
              label: 'Hayır, Vazgeç',
              onClick: () => console.log('Click No')
            }
          ]
        });
    
    
      }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            search: value
        }),
            this.arama();
    }

    handleChangeIn(event) {
        const { name, value } = event.target;

        const stateim = this.state.selected_member;
        stateim[name] = value;
        this.setState({ stateim });
    }
    handleChangeInN(event) {
        const { name, value } = event.target;

        const stateim = this.state.newmember;
        stateim[name] = value;
        this.setState({ stateim });
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
        userService.downloadfile("export", this.state.url).then(result => {
            console.log(result);
            if (!result.success) {
                cogoToast.warn(
                    "Gösterilecek Kullanıcı bulunamadı...",
                    { position: "top-right" }
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
    toggleModal = () => {
        this.setState(prevState => ({
          modalIsOpen: !prevState.modalIsOpen
        }));
      };
      toggleModalN = () => {
        this.setState(prevState => ({
          modalIsOpenNew: !prevState.modalIsOpenNew
        }));
      };

    getMember(token)
    {
        this.setState({
            member_load : true
        });
        
      userService.dynamicService("getMember/"+token).then(result => {
            this.setState(prevState => ({
            modalIsOpen: !prevState.modalIsOpen
          }));

          if(result.success)
          {
              result.data.user_type =  result.data.user_type == 1 ? true : false ;
              result.data.all_sales_view =  result.data.all_sales_view == 1 ? true : false ;
              result.data.konum_kontrol =  result.data.konum_kontrol == 1 ? true : false ;
              result.data.banned =  result.data.banned == 0 ? true : false ;
              
              
              this.setState({
                  selected_member: result.data
              });
          }
          this.setState({
            member_load : false
        });
        }
        );
    }



    RemoteData = () => {

        const toInputUppercase = e => {
            e.target.value = ("" + e.target.value).toUpperCase();
          };

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
                        field: "firstname",
                        render: (rowData) => (
                            <Link to={"/member/"+rowData.token}>
                            <div className="member_div">
                                <div className="member_avatar">
<img  style={{width : 32 , height : 32 , borderRadius : '50%'}}  src={rowData.avatar} />

                                </div>
                                <div className="member_title">
                                <strong>{rowData.fullname}</strong>
                                <small>{rowData.title}</small>
                                </div>
                                
                            </div>
                            </Link>
                         
                        ),
                    },


                    {
                        title: "Telefon",
                        field: "phone",
                        render: (rowData) => (
                            <div>{rowData.phone}</div>

                        ),
                    },
                    {
                        title: "Departman",
                        field: "depertmant",
                        render: (rowData) => (
                            <div>{rowData.depertmant}</div>

                        ),
                    },
                    

                    {
                        title: "Kullanıcı Tipi",
                        field: "user_type",
                        render: (rowData) => (

                           <div>{rowData.user_type == 1 ?  'Yönetici' :  ' Kullanıcı '}</div>
                        ),
                    },

                    {
                        title: "Durumu",
                        field: "banned",
                        render: (rowData) => (

                           <div className={ rowData.banned == '0' ?  'active_user' : 'passive_user' }> <div className="dot"></div> {rowData.banned == '0' ?  'Aktif' :  ' Pasif '}</div>
                        ),
                    },


                    

                    {
                        title: "İşlem",
                        field: "id",
                        sorting: false,
                        render: (rowData) => (

                          <button className="btn btn-primary detay_button"onClick={(e) => this.getMember(rowData.token)}   >  Düzenle </button>
                          
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
                        url += "&status=" + this.props.match.params.id + '&search=' + this.state.search+'&usertype='+this.props.usertype+'&departman='+this.props.departman;

                       
                        this.setState({
                            url: url
                        });

                        userService.dynamicService("stafs?" + url).then(result => {

                            if (result.count < 1) {
                                cogoToast.warn(
                                    "Gösterilecek Kullanıcı bulunamadı...",
                                    { position: "top-center" }
                                );
                            }

                            resolve({
                                data: result.staffs,
                                page: result.page - 1,
                                totalCount: result.count,
                            });


                        }
                        );


                    })
                }
            />
        );
    };



    render() {
        const { user, provider, sales } = this.props;
        const toInputUppercase = e => {

                var inputValue = e.target.value ;
				var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
				inputValue = inputValue.replace(/(([iışğüçö]))/g, function(letter){ return letters[letter]; })
				var capitalized =  inputValue.toUpperCase();
                
            e.target.value = capitalized;
          };
        return (<div className="col-lg-9">
            <div className="card">
            {this.state.member_load ? <div className="overlay_load"> <CommonLoading color="#38d8ee" speed="1.2" /></div> : <></>}
                <div className="card-body card-toolbar">
                    <div className="Search_Table_Div">

                        <ReactSVG src="./assets/img/icons/search.w.svg" height="20px" className="search_table_icon" />
                        <input className="table_search form-control" placeholder="Arama Yap" defaultValue={this.state.search} onChange={this.handleChange} />
                    </div>
                    <button className="export_button bg_yeni" onClick={this.toggleModalN} > <ReactSVG src="./assets/img/icons/personel.svg" /> + YENİ KULLANICI EKLE</button>
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
            <Modal isOpen={this.state.modalIsOpen} className="member_modal">
            <Button className="modal_close_button" onClick={this.toggleModal}>X</Button>
          <ModalHeader className="member_modal_header" >Kullanıcıyı Düzenle</ModalHeader>
          <ModalBody>
          {this.state.modal_load ? <div className="overlay_load"> <CommonLoading color="#38d8ee" speed="1.2" /></div> : <></>}
            <div className="member_form">
            <div className="form-row">
              <div className="col">
                <div className="form-item">
                  <label>İsim</label>
                  <input className="form-control" type="text" onInput={toInputUppercase} placeholder="İsim" onChange={(e) => this.handleChangeIn(e)} name="firstname" value={this.state.selected_member.firstname} />
                
                </div>
              </div>
              <div className="col">
                <div className="form-item">
                  <label>Soyisim</label>
                  <input className="form-control"  type="text"  onInput={toInputUppercase} placeholder="Soyisim" onChange={(e) => this.handleChangeIn(e)} name="lastname" value={this.state.selected_member.lastname}  />
                
                </div>
              </div>
              <div className="col">
                <div className="form-item">
                  <label>Ünvanı</label>
                  <input className="form-control"  type="text"  onInput={toInputUppercase} placeholder="Ünvanı" onChange={(e) => this.handleChangeIn(e)} name="title" value={this.state.selected_member.title} />
                
                </div>
              </div>
           
            </div>
            <div className="form-row">
              <div className="col">
                <div className="form-item">
                  <label>Departman</label>
                  <select className="form-control w-100 bg-white" value={this.state.selected_member.depertmant || ''} onChange={(e) => this.handleChangeIn(e)} name="depertmant">

                        <option value="">Departman Seçiniz</option>
                        {
                      this.props.departments.map((department, index) => {
                        return <option key={`department${index}`} value={department.id} >{department.name}</option>
                      })
                    }

                  </select>
                
                </div>
              </div>
              <div className="col">
                <div className="form-item">
                  <label>E-Posta</label>
                  <input className="form-control"  type="email" placeholder="E-Posta" value={this.state.selected_member.email}  onChange={(e) => this.handleChangeIn(e)} name="email" />
                
                </div>
              </div>
              <div className="col">
                <div className="form-item">
                  <label>Telefon</label>
                  <input className="form-control"  type="tel" placeholder="Telefon"  value={this.state.selected_member.phone}  onChange={(e) => this.handleChangeIn(e)} name="phone" />
                
                </div>
              </div>
           
            </div>
            <div className="form-row">
              <div className="col">
                <div className="form-item">
                  <label>Yeni Şifre <small>(Değiştirmek İstiyorsanız)</small></label>
                  <input className="form-control" placeholder="Yeni Şifre"  type="password"   onChange={(e) => this.handleChangeIn(e)} name="password" />
                
                </div>
              </div>
              <div className="col"></div>
              <div className="col"></div>
              </div>


              <div className="form-row">
              <div className="col">
                <div className="form-item">
                  <label>Kullanıcı Notu</label>
                  <input className="form-control"  type="text" value={this.state.selected_member.note} onChange={(e) => this.handleChangeIn(e)} name="note"  placeholder="Kullanıcı ile alakalı özel not" />
                
                </div>
              </div>
              </div>

            <div className="form-row">
         
              <div className="col">
                <div className="form-item">

                <label htmlFor="material-switch" className="switch_div">
                    <div className="lb">Durumu</div>
                        <Switch
                          checked={this.state.selected_member.banned}
                          onChange={(e) => this.handleChangeSw(e , "banned")}
                          onColor="#15d1eb"
                          onHandleColor="#fff"
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          offColor="#b7d9de"
                          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.1)"
                          activeBoxShadow="0px 8px 18px -5px rgba(0,0,0,0.13)"
                          height={16}
                          width={45}
                          className="react-switch"
                          id="material-switch"
                        />
                        <span>{this.state.selected_member.banned == true ? 'Aktif' : 'Pasif' }</span>
                      </label>


                <label htmlFor="material-switch" className="switch_div">
                <div className="lb">Kullanıcı Tipi</div>
                        <Switch
                          checked={this.state.selected_member.user_type}
                          onChange={(e) => this.handleChangeSw(e , "user_type")}
                          onColor="#15d1eb"
                          onHandleColor="#fff"
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          offColor="#b7d9de"
                          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.1)"
                          activeBoxShadow="0px 8px 18px -5px rgba(0,0,0,0.13)"
                          height={16}
                          width={45}
                          className="react-switch"
                          id="material-switch"
                        />
                        <span>{this.state.selected_member.user_type == true ? 'Yönetici' : 'Kullanıcı' }</span>
                      </label>
                
                        { !this.state.selected_member.user_type ? 
                          <label htmlFor="material-switch" className="switch_div">
                               <div className="lb">Satışları Görsün mü?</div>
                          <Switch
                            checked={this.state.selected_member.all_sales_view}
                            onChange={(e) => this.handleChangeSw(e , "all_sales_view")}
                            onColor="#15d1eb"
                            onHandleColor="#fff"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            offColor="#b7d9de"
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.1)"
                            activeBoxShadow="0px 8px 18px -5px rgba(0,0,0,0.13)"
                            height={16}
                            width={45}
                            className="react-switch"
                            id="material-switch"
                          />
                          <span>{this.state.selected_member.all_sales_view == true ? 'Satışları Görsün' : 'Satışları Görmesin' }</span>
                        </label> : <></>

                        }

                    <label htmlFor="material-switch" className="switch_div">
                    <div className="lb">Statik Ip</div>
                        <Switch
                          checked={this.state.selected_member.konum_kontrol}
                          onChange={(e) => this.handleChangeSw(e , "konum_kontrol")}
                          onColor="#15d1eb"
                          onHandleColor="#fff"
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          offColor="#b7d9de"
                          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.1)"
                          activeBoxShadow="0px 8px 18px -5px rgba(0,0,0,0.13)"
                          height={16}
                          width={45}
                          className="react-switch"
                          id="material-switch"
                        />
                        <span>{this.state.selected_member.konum_kontrol == true ? 'Başka Konumdan Açılabilsin' : 'Başka Konumdan Açamasın' }</span>
                      </label>
                    
                 

                </div>
              </div>
            
            
           
            </div>



            
            <div class="modal_action_div">
            <Button className="action_button_modal" name="submit"  onClick={(e) => this.updateMember()}>Kaydet</Button>
            </div>
           


            </div>

          </ModalBody>
         
        </Modal>
       
       
        <Modal isOpen={this.state.modalIsOpenNew} className="member_modal">
            <Button className="modal_close_button" onClick={this.toggleModalN}>X</Button>
          <ModalHeader className="member_modal_header" >YENİ KULLANICI EKLE</ModalHeader>
          <ModalBody>
          {this.state.modal_load ? <div className="overlay_load"> <CommonLoading color="#38d8ee" speed="1.2" /></div> : <></>}
            <div className="member_form">
            <div className="form-row">
              <div className="col">
                <div className="form-item">
                  <label>İsim</label>
                  <input className="form-control" type="text" onInput={toInputUppercase} placeholder="İsim" onChange={(e) => this.handleChangeInN(e)} name="firstname" value={this.state.newmember.firstname} />
                
                </div>
              </div>
              <div className="col">
                <div className="form-item">
                  <label>Soyisim</label>
                  <input className="form-control"  type="text"  onInput={toInputUppercase} placeholder="Soyisim" onChange={(e) => this.handleChangeInN(e)} name="lastname" value={this.state.newmember.lastname}  />
                
                </div>
              </div>
              <div className="col">
                <div className="form-item">
                  <label>Ünvanı</label>
                  <input className="form-control"  type="text"  onInput={toInputUppercase} placeholder="Ünvanı" onChange={(e) => this.handleChangeInN(e)} name="title" value={this.state.newmember.title} />
                
                </div>
              </div>
           
            </div>
            <div className="form-row">
              <div className="col">
                <div className="form-item">
                  <label>Departman</label>
                  <select className="form-control w-100 bg-white" value={this.state.newmember.depertmant || ''} onChange={(e) => this.handleChangeInN(e)} name="depertmant">

                        <option value="">Departman Seçiniz</option>
                        {
                      this.props.departments.map((department, index) => {
                        return <option key={`department${index}`} value={department.id} >{department.name}</option>
                      })
                    }

                  </select>
                
                </div>
              </div>
              <div className="col">
                <div className="form-item">
                  <label>E-Posta</label>
                  <input className="form-control"  type="email" placeholder="E-Posta" value={this.state.newmember.email}  onChange={(e) => this.handleChangeInN(e)} name="email" />
                
                </div>
              </div>
              <div className="col">
                <div className="form-item">
                  <label>Telefon</label>
                  <input className="form-control"  type="tel" placeholder="Telefon"  value={this.state.newmember.phone}  onChange={(e) => this.handleChangeInN(e)} name="phone" />
                
                </div>
              </div>
           
            </div>
            <div className="form-row">
              <div className="col">
                <div className="form-item">
                  <label>Kullanıcı Şifresi </label>
                  <input className="form-control" placeholder="Yeni Şifre"  type="password"   onChange={(e) => this.handleChangeInN(e)} name="password" />
                
                </div>
              </div>
              <div className="col"></div>
              <div className="col"></div>
              </div>


              <div className="form-row">
              <div className="col">
                <div className="form-item">
                  <label>Kullanıcı Notu</label>
                  <input className="form-control"  type="text" value={this.state.newmember.note} onChange={(e) => this.handleChangeInN(e)} name="note"  placeholder="Kullanıcı ile alakalı özel not" />
                
                </div>
              </div>
              </div>

            <div className="form-row">
         
              <div className="col">
                <div className="form-item">

    
                <label htmlFor="material-switch" className="switch_div">
                <div className="lb">Kullanıcı Tipi</div>
                        <Switch
                          checked={this.state.newmember.user_type}
                          onChange={(e) => this.handleChangeSwn(e , "user_type")}
                          onColor="#15d1eb"
                          onHandleColor="#fff"
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          offColor="#b7d9de"
                          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.1)"
                          activeBoxShadow="0px 8px 18px -5px rgba(0,0,0,0.13)"
                          height={16}
                          width={45}
                          className="react-switch"
                          id="material-switch"
                        />
                        <span>{this.state.newmember.user_type == true ? 'Yönetici' : 'Kullanıcı' }</span>
                      </label>
                
                        { !this.state.newmember.user_type ? 
                          <label htmlFor="material-switch" className="switch_div">
                               <div className="lb">Satışları Görsün mü?</div>
                          <Switch
                            checked={this.state.newmember.all_sales_view}
                            onChange={(e) => this.handleChangeSwn(e , "all_sales_view")}
                            onColor="#15d1eb"
                            onHandleColor="#fff"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            offColor="#b7d9de"
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.1)"
                            activeBoxShadow="0px 8px 18px -5px rgba(0,0,0,0.13)"
                            height={16}
                            width={45}
                            className="react-switch"
                            id="material-switch"
                          />
                          <span>{this.state.newmember.all_sales_view == true ? 'Satışları Görsün' : 'Satışları Görmesin' }</span>
                        </label> : <></>

                        }

                    <label htmlFor="material-switch" className="switch_div">
                    <div className="lb">Statik Ip</div>
                        <Switch
                          checked={this.state.newmember.konum_kontrol}
                          onChange={(e) => this.handleChangeSwn(e , "konum_kontrol")}
                          onColor="#15d1eb"
                          onHandleColor="#fff"
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          offColor="#b7d9de"
                          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.1)"
                          activeBoxShadow="0px 8px 18px -5px rgba(0,0,0,0.13)"
                          height={16}
                          width={45}
                          className="react-switch"
                          id="material-switch"
                        />
                        <span>{this.state.newmember.konum_kontrol == true ? 'Başka Konumdan Açılabilsin' : 'Başka Konumdan Açamasın' }</span>
                      </label>
                    
                 

                </div>
              </div>
            
            
           
            </div>



            
            <div class="modal_action_div">
            <Button className="action_button_modal" name="submit"  onClick={(e) => this.newMember()}>Kaydet</Button>
            </div>
           


            </div>

          </ModalBody>
         
        </Modal>
       
       
        </div>);

    }
}




export default withRouter(PersonelTable);
