<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Update Student</h3>
            </div>
            <div class="card-body">
                <ul class="alert alert-danger" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                    <label for="">Name</label>
                    <input type="text" class="form-control" v-model="model.student.name" placeholder="Enter name">
                </div>
                <div class="mb-3">
                    <label for="">Course</label>
                    <input type="text" class="form-control" v-model="model.student.course" placeholder="Enter course">
                </div>
                <div class="mb-3">
                    <label for="">Email</label>
                    <input type="text" class="form-control" v-model="model.student.email" placeholder="Enter email">
                </div>
                <div class="mb-3">
                    <label for="">Phone</label>
                    <input type="text" class="form-control" v-model="model.student.phone" placeholder="Enter phone">
                </div>
                <div class="mb-3">
                    <button type="button" @click="updateStudent" class="btn btn-primary btn-sm">Update</button>
                </div>
               
            </div>
        </div>
       
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'StudentEdit',
    data(){
        return{
            studentId: '',
            errorList: '',
            model: {
                student: {
                    name: '',
                    course: '',
                    email: '',
                    phone: '',
                }
            }
        }
    },
    mounted(){
    //   console.log(this.$route.params.id);
      this.getStudentData(this.$route.params.id);
      this.studentId = this.$route.params.id;
    },
    methods: {
        getStudentData(studentId){
            axios.get(`http://127.0.0.1:8000/api/student/edit/${studentId}`).then(res => {
                this.model.student.name = res.data.student.name;
                this.model.student.course = res.data.student.course;
                this.model.student.email = res.data.student.email;    
                this.model.student.phone = res.data.student.phone;
                
            }).catch(function(error){
                if (error.response) {
                    if(error.response.status == 400){
                        alert(error.response.data.message);
                    }
                }
            });
        },
        updateStudent(){
            var myError = this;
            axios.put(`http://127.0.0.1:8000/api/student/update/${this.studentId}`, this.model.student).then(res => {
                console.log(res.data);
                alert(res.data.message);
                this.errorList = '';
            }).catch(function(error){
                if (error.response) {
                    if(error.response.status == 422){
                        myError.errorList = error.response.data.errors;
                    }
                    if(error.response.status == 404){
                        myError.errorList = error.response.data.message;
                    }
                } else if (error.request) {
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                }
                console.log(error.config);
            });
        }
    }
}
</script>