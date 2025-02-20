import { defineStore } from "pinia";
import { computed, onMounted, ref, reactive } from "vue"

export const useAuthStore = defineStore('auth', () => {

    const token = ref("")
    const getToken = computed(() => token.value)

    function login(data:{ email: string, password: string }){

        fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        }).then((result:any) => {
            return result.json()
        }).then((obj) => {
            if(obj.token){
                token.value = obj.token
                localStorage.setItem('tearoom-token', JSON.stringify(token.value))
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    function logout(){

    }

    return {
        getToken, login, logout
    }
})