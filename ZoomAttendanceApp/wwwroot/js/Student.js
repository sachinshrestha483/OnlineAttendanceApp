const getBranchurl = "/branch/getBranches";
const AddSubject = "/subject/AddSubject";
const EditBranchUrl = "/branch/EditBranch"
const getSubjects = "/subject/Getsubjects"
const EditSubject = "/subject/EditSubject"


const AddStudent = "/student/AddStudent";

const GetStudents = "/student/GetStudents";

const UpdateStudent ="/student/UpdateStudent"




new Vue({
    // el means element which it going to control
    // now after giving it the id of the dom  vue make a connection between the this insrtance and  that given name..
    //this instance goinfg to dcontrol  every thing  to do with the dom element  every thing inside it 
    el: '#vue-app',
    data: {
        //key value pair 

        resultObj: {},
        students: {},
        name: "",
        Semester: "",
        Email: "",
        //    SubjectId: 0,
        branches: {},
        phoneNumber: "",

        EnrollementNumber: "",
        branchId: "",
        //    subjects: {},


        showEditStudentId: 0,
        //   EditSubjectName: "",
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



        saveEditStudent: async function () {

            if (this.EditName == "" || this.EditEmail == "" || this.EditPhoneNumber == "" || this.EditEnrollementNumber == "" || this.showEditStudentId==0) {







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


        SetshowEditStudentId: function (id) {

            console.log("Function Get Called:" + id);

            if (id == this.showEditStudentId) {
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
                //branchName
                //total += $this.items[i].price * $this.items[i].qty;
            }


        },

        setEditSemester: function (event) {
            this.EditSemester = event.target.value;

        },

        setEditBranchId: function (event) {
            this.EditbranchId = event.target.value;

        },


        getBranches: function () {



            axios.get(getBranchurl).then(response => {
                this.branches = response.data
                console.log(this.branches);

            })
        },

        getStudents: function () {



            axios.get(GetStudents).then(response => {
                this.students = response.data
                console.log(this.students);

            })
        },


        setSemester: function (event) {


            this.Semester = event.target.value;

        },


        setBranchId: function (event) {


            this.branchId = event.target.value;

        },


        saveStudent: async function () {
            if (this.name == "" || this.Email == "" || this.Semester == "" || this.phoneNumber == "" || this.EnrollementNumber == "" || this.branchId == "") {

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

            formData.append('name', this.name);
            formData.append('Email', this.Email);
            formData.append('phoneNumber', this.phoneNumber);
            formData.append('Semester', this.Semester);
            formData.append('Branch', this.branchId);
            formData.append('EnrollementNumber', this.EnrollementNumber);


            await axios.post(AddStudent, formData).then((response) => {
                //console.log(my_object);
                const data = response.data;
                if (response.status == 200) {
                    toastr.success("Student Added Sucessfully");
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
                    toastr.error("Error in Adding Student");
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

            this.name = "";
            this.Email = "";
            this.phoneNumber = "";
           
            this.EnrollementNumber = "";
        },



        // New functions




   //     SetEditBranchId: function (event) {


            //   console.log(event.target.value);

        //    this.EditbranchId = event.target.value;

            // console.log(this.SubjectId + 1);

    //    },

  //      SeteditSemester: function (event) {
            //  console.log(event.target.value);
     //       this.EditSemester = event.target.value;
 //       },





       //saveEditSubject: async function () {

       //     if (this.showEditSubjectId == 0 || this.EditSubjectName == "") {

       //         toastr.error("Edit Name Cannot Be Null");
       //         toastr.options = {
       //             "closeButton": false,
       //             "debug": false,
       //             "newestOnTop": false,
       //             "progressBar": false,
       //             "positionClass": "toast-top-right",
       //             "preventDuplicates": true,
       //             "onclick": null,
       //             "showDuration": "300",
       //             "hideDuration": "1000",
       //             "timeOut": "5000",
       //             "extendedTimeOut": "1000",
       //             "showEasing": "swing",
       //             "hideEasing": "linear",
       //             "showMethod": "fadeIn",
       //             "hideMethod": "fadeOut"
       //         }


       //         return;
       //     }

       //     const formData = new FormData();

       //     formData.append('Name', this.EditSubjectName);
       //     formData.append('BranchId', this.EditbranchId);
       //     formData.append('SemesterId', this.EditSemester);
       //     formData.append('SubjectId', this.showEditSubjectId);


       //     await axios.post(EditSubject, formData).then((response) => {
       //         //console.log(my_object);
       //         const data = response.data;
       //         if (response.status == 200) {
       //             toastr.success("Subject Added Sucessfully");
       //             toastr.options = {
       //                 "closeButton": false,
       //                 "debug": false,
       //                 "newestOnTop": false,
       //                 "progressBar": false,
       //                 "positionClass": "toast-top-right",
       //                 "preventDuplicates": true,
       //                 "onclick": null,
       //                 "showDuration": "300",
       //                 "hideDuration": "1000",
       //                 "timeOut": "5000",
       //                 "extendedTimeOut": "1000",
       //                 "showEasing": "swing",
       //                 "hideEasing": "linear",
       //                 "showMethod": "fadeIn",
       //                 "hideMethod": "fadeOut"
       //             }


       //         }


       //         //console.log(response);
       //     }).catch(function (error) {
       //         if (error.response) {
       //             toastr.error("Error in Adding Subject");
       //             toastr.options = {
       //                 "closeButton": false,
       //                 "debug": false,
       //                 "newestOnTop": false,
       //                 "progressBar": false,
       //                 "positionClass": "toast-top-right",
       //                 "preventDuplicates": true,
       //                 "onclick": null,
       //                 "showDuration": "300",
       //                 "hideDuration": "1000",
       //                 "timeOut": "5000",
       //                 "extendedTimeOut": "1000",
       //                 "showEasing": "swing",
       //                 "hideEasing": "linear",
       //                 "showMethod": "fadeIn",
       //                 "hideMethod": "fadeOut"
       //             }

       //             //   console.log(error.response.status);
       //         }

       //     });






       //     this.getSubjects();
       //     this.EditSubjectName = "";




       // },



    ////    showEditSubjectIdFun: function (id) {

    //        if (this.showEditSubjectId == id) {
    //            this.showEditSubjectId = 0;
    //            return;
    //        }


    //        this.showEditSubjectId = id;

    //        for (var i = 0; i < this.subjects.length; i++) {
    //            if (this.subjects[i].id == this.showEditSubjectId) {
    //                this.EditSubjectName = this.subjects[i].name;
    //            }
    //            //branchName
    //            //total += $this.items[i].price * $this.items[i].qty;
    //        }




    //    },





    //    SetBranchId: function (event) {


    //        //   console.log(event.target.value);

    //        this.branchId = event.target.value;

    //        // console.log(this.SubjectId + 1);

    //    },

    //    SetSemester: function (event) {
    //        //  console.log(event.target.value);
    //        this.Semester = event.target.value;
    //    },




    //    AddSubject: async function () {

    //        if (this.branchId == "" || this.Semester == "" || this.name == "") {

    //            //     Console.log()

    //            toastr.error("Subject  Name  or  Semester or  Branch Cannot Be Empty ");
    //            toastr.options = {
    //                "closeButton": false,
    //                "debug": false,
    //                "newestOnTop": false,
    //                "progressBar": false,
    //                "positionClass": "toast-top-right",
    //                "preventDuplicates": true,
    //                "onclick": null,
    //                "showDuration": "300",
    //                "hideDuration": "1000",
    //                "timeOut": "5000",
    //                "extendedTimeOut": "1000",
    //                "showEasing": "swing",
    //                "hideEasing": "linear",
    //                "showMethod": "fadeIn",
    //                "hideMethod": "fadeOut"
    //            }

    //            return;
    //        }

    //        else {

    //            const formData = new FormData();

    //            formData.append('Name', this.name);
    //            formData.append('BranchId', this.branchId);
    //            formData.append('SemesterId', this.Semester);

    //            await axios.post(AddSubject, formData).then((response) => {
    //                //console.log(my_object);
    //                const data = response.data;
    //                if (response.status == 200) {
    //                    toastr.success("Subject Added Sucessfully");
    //                    toastr.options = {
    //                        "closeButton": false,
    //                        "debug": false,
    //                        "newestOnTop": false,
    //                        "progressBar": false,
    //                        "positionClass": "toast-top-right",
    //                        "preventDuplicates": true,
    //                        "onclick": null,
    //                        "showDuration": "300",
    //                        "hideDuration": "1000",
    //                        "timeOut": "5000",
    //                        "extendedTimeOut": "1000",
    //                        "showEasing": "swing",
    //                        "hideEasing": "linear",
    //                        "showMethod": "fadeIn",
    //                        "hideMethod": "fadeOut"
    //                    }


    //                }


    //                //console.log(response);
    //            }).catch(function (error) {
    //                if (error.response) {
    //                    toastr.error("Error in Adding Subject");
    //                    toastr.options = {
    //                        "closeButton": false,
    //                        "debug": false,
    //                        "newestOnTop": false,
    //                        "progressBar": false,
    //                        "positionClass": "toast-top-right",
    //                        "preventDuplicates": true,
    //                        "onclick": null,
    //                        "showDuration": "300",
    //                        "hideDuration": "1000",
    //                        "timeOut": "5000",
    //                        "extendedTimeOut": "1000",
    //                        "showEasing": "swing",
    //                        "hideEasing": "linear",
    //                        "showMethod": "fadeIn",
    //                        "hideMethod": "fadeOut"
    //                    }

    //                    //   console.log(error.response.status);
    //                }

    //            });




    //        }

    //        this.getSubjects();
    //        this.name = "";



    //    },




    //    // old functions



    //    EditBranchName: async function () {


    //        if (this.EditBranchName == "") {
    //            if (this.branchName == "") {
    //                toastr.error("Branch Name Cannot be empty");
    //                toastr.options = {
    //                    "closeButton": false,
    //                    "debug": false,
    //                    "newestOnTop": false,
    //                    "progressBar": false,
    //                    "positionClass": "toast-top-right",
    //                    "preventDuplicates": true,
    //                    "onclick": null,
    //                    "showDuration": "300",
    //                    "hideDuration": "1000",
    //                    "timeOut": "5000",
    //                    "extendedTimeOut": "1000",
    //                    "showEasing": "swing",
    //                    "hideEasing": "linear",
    //                    "showMethod": "fadeIn",
    //                    "hideMethod": "fadeOut"
    //                }
    //                return;
    //            }
    //        }


    //        const formData = new FormData();

    //        formData.append('id', this.showEditId);
    //        formData.append('branchName', this.editBranchName);






    //        //};
    //        await axios.post(EditBranchUrl, formData).then((response) => {
    //            //console.log(my_object);
    //            const data = response.data;
    //            if (response.status == 200) {
    //                toastr.success("Edited Branch Sucessfully");
    //                toastr.options = {
    //                    "closeButton": false,
    //                    "debug": false,
    //                    "newestOnTop": false,
    //                    "progressBar": false,
    //                    "positionClass": "toast-top-right",
    //                    "preventDuplicates": true,
    //                    "onclick": null,
    //                    "showDuration": "300",
    //                    "hideDuration": "1000",
    //                    "timeOut": "5000",
    //                    "extendedTimeOut": "1000",
    //                    "showEasing": "swing",
    //                    "hideEasing": "linear",
    //                    "showMethod": "fadeIn",
    //                    "hideMethod": "fadeOut"
    //                }


    //            }


    //            //console.log(response);
    //        }).catch(function (error) {
    //            if (error.response) {
    //                toastr.error("Error in Editing Branch");
    //                toastr.options = {
    //                    "closeButton": false,
    //                    "debug": false,
    //                    "newestOnTop": false,
    //                    "progressBar": false,
    //                    "positionClass": "toast-top-right",
    //                    "preventDuplicates": true,
    //                    "onclick": null,
    //                    "showDuration": "300",
    //                    "hideDuration": "1000",
    //                    "timeOut": "5000",
    //                    "extendedTimeOut": "1000",
    //                    "showEasing": "swing",
    //                    "hideEasing": "linear",
    //                    "showMethod": "fadeIn",
    //                    "hideMethod": "fadeOut"
    //                }

    //                //   console.log(error.response.status);
    //            }

    //        });

    //        // this.getSections(this.courseId);

    //        // console.log(this.resultObj);

    //        this.editBranchName = "";
    //        this.getBranches();







    //    },



        //showEditFun: function (id) {

        //    if (this.showEditId == id) {
        //        this.showEditId = 0;
        //        return;
        //    }

        //    this.showEditId = id;

        //    for (var i = 0; i < this.resultObj.length; i++) {
        //        if (this.resultObj[i].id == this.showEditId) {
        //            this.editBranchName = this.resultObj[i].branchName;
        //        }
        //        //branchName
        //        //total += $this.items[i].price * $this.items[i].qty;
        //    }


        //    //this.editBranchName = resultObj;

        //},


     




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




        //processForm: async function (a) {



        //    if (this.branchName == "") {
        //        toastr.error("Branch Name Cannot be empty");
        //        toastr.options = {
        //            "closeButton": false,
        //            "debug": false,
        //            "newestOnTop": false,
        //            "progressBar": false,
        //            "positionClass": "toast-top-right",
        //            "preventDuplicates": true,
        //            "onclick": null,
        //            "showDuration": "300",
        //            "hideDuration": "1000",
        //            "timeOut": "5000",
        //            "extendedTimeOut": "1000",
        //            "showEasing": "swing",
        //            "hideEasing": "linear",
        //            "showMethod": "fadeIn",
        //            "hideMethod": "fadeOut"
        //        }
        //        return;
        //    }

        //    const formData = new FormData();

        //    formData.append('Name', this.branchName);




        //    //};
        //    await axios.post(AddBranch, formData).then((response) => {
        //        //console.log(my_object);
        //        const data = response.data;
        //        if (response.status == 200) {
        //            toastr.success("Added Branch Sucessfully");
        //            toastr.options = {
        //                "closeButton": false,
        //                "debug": false,
        //                "newestOnTop": false,
        //                "progressBar": false,
        //                "positionClass": "toast-top-right",
        //                "preventDuplicates": true,
        //                "onclick": null,
        //                "showDuration": "300",
        //                "hideDuration": "1000",
        //                "timeOut": "5000",
        //                "extendedTimeOut": "1000",
        //                "showEasing": "swing",
        //                "hideEasing": "linear",
        //                "showMethod": "fadeIn",
        //                "hideMethod": "fadeOut"
        //            }


        //        }


        //        //console.log(response);
        //    }).catch(function (error) {
        //        if (error.response) {
        //            toastr.error("Error in Adding Branch");
        //            toastr.options = {
        //                "closeButton": false,
        //                "debug": false,
        //                "newestOnTop": false,
        //                "progressBar": false,
        //                "positionClass": "toast-top-right",
        //                "preventDuplicates": true,
        //                "onclick": null,
        //                "showDuration": "300",
        //                "hideDuration": "1000",
        //                "timeOut": "5000",
        //                "extendedTimeOut": "1000",
        //                "showEasing": "swing",
        //                "hideEasing": "linear",
        //                "showMethod": "fadeIn",
        //                "hideMethod": "fadeOut"
        //            }

        //            //   console.log(error.response.status);
        //        }

        //    });

        //    // this.getSections(this.courseId);

        //    // console.log(this.resultObj);

        //    this.branchName = "";
        //    this.getBranches();


        //},








    },
    //dosent control anything outside the el 
    mounted() {

        this.getBranches();
        this.getStudents();
      //  this.getSubjects();
    },

});