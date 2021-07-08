const getBranchurl = "/branch/getBranches";
const AddBranch = "/branch/AddBranch";
const EditBranchUrl ="/branch/EditBranch"



new Vue({
    // el means element which it going to control
    // now after giving it the id of the dom  vue make a connection between the this insrtance and  that given name..
    //this instance goinfg to dcontrol  every thing  to do with the dom element  every thing inside it 
    el: '#vue-app',
    data: {
        //key value pair 
      
        resultObj: {},
        branchName: "",
        editBranchName:"",
        showEditId:0,

    }
    ,
    methods: {
        // can acess the yhe values of the data 
        // this means the instance it self


        EditBranchName: async function () {


            if (this.EditBranchName == "") {
                if (this.branchName == "") {
                    toastr.error("Branch Name Cannot be empty");
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": true,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }
                    return;
                }
            }


            const formData = new FormData();

            formData.append('id', this.showEditId);
            formData.append('branchName', this.editBranchName);






            //};
            await axios.post(EditBranchUrl, formData).then((response) => {
                //console.log(my_object);
                const data = response.data;
                if (response.status == 200) {
                    toastr.success("Edited Branch Sucessfully");
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": true,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }


                }


                //console.log(response);
            }).catch(function (error) {
                if (error.response) {
                    toastr.error("Error in Editing Branch");
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": true,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }

                    //   console.log(error.response.status);
                }

            });

            // this.getSections(this.courseId);

            // console.log(this.resultObj);

            this.editBranchName = "";
            this.getBranches();







        },



        showEditFun: function (id) {

            if (this.showEditId == id) {
                this.showEditId = 0;
                return;
            }

            this.showEditId = id;

            for (var i = 0; i < this.resultObj.length; i++) {
                if (this.resultObj[i].id == this.showEditId) {
                    this.editBranchName = this.resultObj[i].branchName;
                }
                    //branchName
                //total += $this.items[i].price * $this.items[i].qty;
            }


            //this.editBranchName = resultObj;

        },


        getBranches: function () {

           

            axios.get(getBranchurl).then(response => {
                this.resultObj = response.data
                console.log(this.resultObj);

            })
        },




        //toastr.success("Added Content Sucessfully");
        //this.showLoaderEditAddingDownlodableContent = false;
        ////this.showUploading = false;
        ////this.showArticleUploading = false;


        //toastr.options = {
        //    "closeButton": false,
        //    "debug": false,
        //    "newestOnTop": false,
        //    "progressBar": false,
        //    "positionClass": "toast-top-right",
        //    "preventDuplicates": true,
        //    "onclick": null,
        //    "showDuration": "300",
        //    "hideDuration": "1000",
        //    "timeOut": "5000",
        //    "extendedTimeOut": "1000",
        //    "showEasing": "swing",
        //    "hideEasing": "linear",
        //    "showMethod": "fadeIn",
        //    "hideMethod": "fadeOut"
        //}



        //toastr.error("Not Able To Upload The File");
        //toastr.options = {
        //    "closeButton": false,
        //    "debug": false,
        //    "newestOnTop": false,
        //    "progressBar": false,
        //    "positionClass": "toast-top-right",
        //    "preventDuplicates": true,
        //    "onclick": null,
        //    "showDuration": "300",
        //    "hideDuration": "1000",
        //    "timeOut": "5000",
        //    "extendedTimeOut": "1000",
        //    "showEasing": "swing",
        //    "hideEasing": "linear",
        //    "showMethod": "fadeIn",
        //    "hideMethod": "fadeOut"
        //}




        processForm: async function (a) {



            if (this.branchName == "") {
                toastr.error("Branch Name Cannot be empty");
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": true,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
                return;
            }
          
            const formData = new FormData();

            formData.append('Name', this.branchName);
           



            //};
            await axios.post(AddBranch, formData).then((response) => {
                //console.log(my_object);
                const data = response.data;
                if (response.status == 200) {
                    toastr.success("Added Branch Sucessfully");
                    toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": true,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }


                }


                //console.log(response);
            }).catch(function (error) {
                if (error.response) {
                    toastr.error("Error in Adding Branch");
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": true,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }

                 //   console.log(error.response.status);
                }

            });

           // this.getSections(this.courseId);

            // console.log(this.resultObj);

            this.branchName = "";
            this.getBranches();


        },








    },
    //dosent control anything outside the el 
     mounted() {

         this.getBranches();
    },

});