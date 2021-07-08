const getBranchurl = "/branch/getBranches";
const AddBranch = "/branch/AddBranch";
const EditBranchUrl = "/branch/EditBranch"
const GetStudents = "/student/GetStudents";

const UpdateStudent = "/student/UpdateStudent"


new Vue({
    // el means element which it going to control
    // now after giving it the id of the dom  vue make a connection between the this insrtance and  that given name..
    //this instance goinfg to dcontrol  every thing  to do with the dom element  every thing inside it 
    el: '#vue-app',
    data: {
        //key value pair 

        searchStudentName: "",
        SearchStudentEnrollementId: "",
        SearchStudentBranch: "",
        SearchStudentSemester: "",
        searchStudentEmail: "",
        searchStudentPhoneNumber:"",


     //   EditStudentId:"",

        students: {},
        branches: {},

        filteredStudents: {},
       
        showEditId: 0,




        showEditStudentId: 0,


        EditSemester: "",
        EditbranchId: "",
        EditEnrollementNumber: "",
        EditPhoneNumber: "",
        EditEmail: "",
        EditName: "",










    }
    ,
    methods: {
        // can acess the yhe values of the data 
        // this means the instance it self

        setEditSemester: function (event) {
            this.EditSemester = event.target.value;

        },

        setEditBranchId: function (event) {
            this.EditbranchId = event.target.value;

        },


        saveEditStudent: async function () {

            if (this.EditName == "" || this.EditEmail == "" || this.EditPhoneNumber == "" || this.EditEnrollementNumber == "" || this.showEditStudentId == 0) {







                toastr.error("Required Field Cannot Be Null ");
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
            formData.append("id", this.showEditStudentId);
            formData.append('name', this.EditName);
            formData.append('Email', this.EditEmail);
            formData.append('phoneNumber', this.EditPhoneNumber);
            formData.append('Semester', this.EditSemester);
            formData.append('Branch', this.EditbranchId);
            formData.append('EnrollementNumber', this.EditEnrollementNumber);



            await axios.post(UpdateStudent, formData).then((response) => {
                //console.log(my_object);
                const data = response.data;
                if (response.status == 200) {
                    toastr.success("Student  Edited  Sucessfully");
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
                    toastr.error("Error in  Editing Adding Student");
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

            this.getStudents();


        },



        showEditStudentIdFun: function (id) {


            if (this.showEditStudentId == id) {
                this.showEditStudentId = 0;
                return;
            }


            this.showEditStudentId = id;




            for (var i = 0; i < this.students.length; i++) {
                if (this.students[i].id == this.showEditStudentId) {
                    this.EditEmail = this.students[i].email;
                    this.EditName = this.students[i].name;
                    this.EditPhoneNumber = this.students[i].phoneNumber;
                    this.EditEnrollementNumber = this.students[i].enrollementId;
                    //this.EditbranchId = this.students[i].email;
                    //this.EditSemester = this.students[i].email;
                }
            }


        },



        SearchStudent: function () {


            //if (this.searchStudentName != "" && this.SearchStudentBranch != "" && this.SearchStudentEnrollementId != "" && this.SearchStudentSemester != "") {






            //}



            //for (var i = 0; i < this.students.length; i++) {
            //    if (this.students[i].id == this.showEditStudentId) {
            //        this.EditEmail = this.students[i].email;
            //        this.EditName = this.students[i].name;
            //        this.EditPhoneNumber = this.students[i].phoneNumber;
            //        this.EditEnrollementNumber = this.students[i].enrollementId;
            //        //this.EditbranchId = this.students[i].email;
            //        //this.EditSemester = this.students[i].email;
            //    }
            //    //branchName
            //    //total += $this.items[i].price * $this.items[i].qty;
            //}




        },
        getStudents: function () {



            axios.get(GetStudents).then(response => {
                this.students = response.data
               // console.log(this.students);

            })
        },

        getBranches: function () {

           

            axios.get(getBranchurl).then(response => {
                this.branches = response.data
               // console.log(this.resultObj);

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
        this.getStudents();
        this.getBranches();
        
    },

});