<template>
   <div class="card">
    <div class="card-header">
        <h4>Students <RouterLink to="/student/create" class="btn btn-primary">Add Student</RouterLink></h4>
    </div>
    <div class="card-body">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Created At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody v-if="this.students.length > 0">
                <tr v-for="(student, index) in this.students" :key="index">
                   <td>{{ student.id }}</td>
                   <td>{{ student.name }}</td>
                   <td>{{ student.course }}</td>
                   <td>{{ student.email }}</td>
                   <td>{{ student.phone }}</td>
                   <td>{{ student.created_at }}</td>
                   <td>
                      <RouterLink :to="{path:'edit/'+student.id}" class="btn btn-warning btn-sm">Update</RouterLink>
                      <button type="button" @click="deleteStudent(student.id)" class="btn btn-danger btn-sm">Delete</button>
                   </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="6">Loading...</td>
                </tr>
            </tbody>
        </table>
    </div>
   </div>
  </template>
  <script>
   import axios from 'axios';
   export default {
    name: 'students',
    data(){
        return{
            students:[]
        }
    },
    mounted(){
      this.getStudents();
    },
    methods: {
      getStudents(){
        axios.get('http://127.0.0.1:8000/api/student').then(res => {
           this.students = res.data.students;
           console.log(this.students);
        });
      },
      deleteStudent(studentId){
        if(confirm('Are you sure, You want to delete the data ?')){
           axios.delete(`http://127.0.0.1:8000/api/student/delete/${studentId}`).then(res => {
              alert(res.data.message);
              this.getStudents();
           }).catch(function(error){
                if (error.response) {
                    if(error.response.status == 404){
                        alert(error.response.data.message);
                    }
                }
            });
        }
      }
    }
   }
</script>
  
  