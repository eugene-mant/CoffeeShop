<styles lang="scss">

    $nav-item-space-between: .5em;

    .main-nav {
        display: flex;
        margin: auto 2rem auto 0;
        justify-content: right;
        flex: 1;

        a {
            position: relative;
            display: block;
            font-weight: 500;
            margin-left: 40px;
            font-size: 1.1em;
            padding: .4em .4em;
            color: black;
            text-decoration: none;
            
            &.router-link-active {
                border-radius: 2rem;
                color: white;
                background: rgb(104, 196, 238);  
            }

            &:not(:last-child) {
                margin-right: $nav-item-space-between;
            }
         
        }

        .search {
            width: 20em;
            height: 2em;
            margin-right: 120;
        }

        .btnLogin-popup{
            width: 130px;
            height: 50px;
            background: transparent;
            border: 2px solid rgb(0, 0, 0);
            outline: none;  
            border-radius: 6px;
            cursor: pointer;
            text-align: center;
            font-size: 1.1em;
            color:black;
            font-weight: 500;
            margin-left: 40px;
            transition: .5s;
        }
        
        .btnLogin-popup:hover {
            background: rgb(104, 196, 238);  
            color: #162938;
        }

    }
</styles>

<template>
    <div class="main-nav">
        <in-dev class="search" type="component" title="Пошук" />
        
        <router-link to="/">Home</router-link>
        <router-link to="/menu">Menu</router-link>
        <router-link to="/about">About</router-link>
        <button class="btnLogin-popup" @click="$emit('toggleLoginForm')">Login</button>
    </div>
    
</template>

<script>
</script>