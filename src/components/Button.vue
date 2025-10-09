<template>
    <div>
        <button v-for="route in routes" @click="go(route.path)">{{ route.name }}</button>
    </div>
</template>

<script setup lang='ts'>
import {routes} from '@/router/index'
import { useRouter } from 'vue-router';

defineProps<{
    url:string
}>()
const router=useRouter()
const go=(path:string)=>{
    router.push(path)
}
</script>

<style scoped>

</style>