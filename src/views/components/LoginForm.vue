<styles lang="scss">
.wrapper {
    position:relative;
    width: 400px;
    height: 440px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .5);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transform: scale(0);
    transition: transform .5s ease, height .2s ease;
          }

    .active-popup{
      transform: scale(1);
  }

.wrapper.active {
  height: 520px;
}    
.form-box.login {
   transition: transform .18s ease;
   transform: translateX(0);
} 

.wrapper.active .form-box.login{
    transition: none;
    transform: translateX(-400px);
}
.form-box.register{
    position: absolute;
    transition: none;
    transform: translateX(400px);
}
.wrapper.active .form-box.register{
    transition: none;
    transform: translateX(-400px);
}

.icon-clode {
        position: absolute;
        top: 0;
        right: 0;
        width: 45px;
        height: 45px;
        background: #162938;
        font-size: 2em;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom-left-radius: 20px;
        cursor: pointer;
        z-index: 1;
    }

.form-box {
        width: 100%;
        padding: 40px;
   
}

h2 {
     font-size: 2ex;
     color: #162938;
     text-align: center;
   }

.input-box {
      position: relative;
      widows: 100%;
      height: 50px;
      border-bottom: 2px solid #162938;
      margin: 30px 0;
}
label {
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
        font-style: 1em;
        color: #162938;
        font-weight: 500;
        pointer-events: none;
        transition: .5s;
      }

input:focus~label,
input:valid~label{
        top:-5px;
      }

input {
       width: 100%;
       height: 100%;
       background: transparent;
       border:none;
       outline: none;
       font-style: 1em;
       color: #162938;
       font-weight: 600;
       padding: 0 35px 0 5px;
      }
      
.font-awesome-icon {
        position: absolute;
        right: 8px;
        font-size: 1.2em;
        color: #162938;
        line-height: 57px;
      }
   
.rememder-forgot {
    font-size: .9em;
    color: #162938;
    font-weight: 500;
    margin: -15px 0 15px;
    display:flex;
    justify-content: space-between;
}

label input{
        accent-color: #162938;
        margin-right: 3px;
    }

a {
        color: #162938;
        text-decoration: none;
    }

a:hover {
        text-decoration: underline;
    }

   

.btn {
    width: 100%;
    height: 45px;
    background: none;
    border: 60px;
    border-style: solid;
    border-width: 5px;
    border-color: white;
    outline: none;
    cursor: pointer;
    font-size: 1em;
    text-decoration-color: #fff;
    font-weight: 500;
    text-align: center;
   }
   
.login-register{
    font-size: .9em;
    color: #162938;
    text-align: center;
    font-weight: 500;
    margin: 25px 0 10px;
}

p a{
    color: #162938;
    text-decoration: none;
    font-weight: 600;

    }



p a:hover{
        text-decoration: underline;
    }


</styles>

<template>

  <div class="wrapper" :class="isOpenClass">
      <span class="icon-close">
          <font-awesome-icon
           icon="fa-light fa-xmark" />
      </span>
  
      <div class="form-box login">
          <h2>{{lbs.login}}</h2>
           <form action="#">
                <div class="input-box">
                    <span class="icon">
                      <font-awesome-icon 
                      icon="fa-thin fa-envelope" />
                    </span>
                            <input type="email" required>
                            <label>{{lbs.email}}</label>
                </div>
                <div class="input-box">
                    <span class="icon">
                      <font-awesome-icon 
                      icon="fa-thin fa-lock-keyhole" />
                    </span>
                            <input type="password" required>
                            <label>{{lbs.password}}</label>
                </div>
                <div class="rememder-forgot">
                      <label>
                      <input type="checkbox">{{lbs.remember}}
                      </label>
                  <a href="#">{{lbs.forgot}}</a>
                </div>
                   <button type="submit" class="btn">{{lbs.login}}</button>
                <div class="login-register">
                  <p>{{lbs.nothaveaccount}}
                     <a href="#" class="register-link">{{lbs.register}}</a>
                  </p>
                </div>
           </form>
      </div>
  
      <div class="form-box register">
          <h2>{{lbs.registration}}</h2>
           <form action="#">
              <div class="input-box">
                    <span class="icon">
                      <font-awesome-icon 
                      icon="fa-thin fa-user" />
                    </span>
                            <input type="text" required>
                            <label>{{lbs.username}}</label>
                </div>
                <div class="input-box">
                    <span class="icon">
                      <font-awesome-icon 
                      icon="fa-thin fa-envelope" />
                    </span>
                            <input type="email" required>
                            <label>{{lbs.email}}</label>
                </div>
                <div class="input-box">
                    <span class="icon">
                      <font-awesome-icon 
                      icon="fa-thin fa-lock-keyhole" />
                    </span>
                            <input type="password" required>
                            <label>{{lbs.password}}</label>
                </div>
                <div class="rememder-forgot">
                      <label>
                      <input type="checkbox">{{lbs.terms}}
                      </label>
                
                </div>
                   <button type="submit" class="btn">{{lbs.register}}</button>
                <div class="login-register">
                  <p>{{lbs.haveaccount}}
                     <a href="#" class="login-link">{{lbs.login}}</a>
                  </p>
                </div>
           </form>
      </div>
  </div>
  
  </template>
  
  <script>
  
  const labels = {
    login: 'Login',
    email: 'Email',
    username: `Username`,
    password: 'Password',
    register: `Register`,
    remember: `Remember me`,
    forgot: `Forgot Password?`,
    registration: `Registration`,
    terms: `I agree to the terms & conditions`,
    haveaccount: `Already have an account?`,
    nothaveaccount: `Don't have an account?`,
  }
  
  export default{
    name: 'LoginForm',
    props: ['open'],
    components: {
  
    },
    data: () =>({
      isOpenLoginBlocklbs:false,
      lbs: labels,
      loginFormData:{
        email: 'email@gmail.com',
        password: '',
      }
    }),
    // computed значення, це ті що вираховується на основі чогось іншого
    computed: {
      isOpenClass() { 
        // якщо prop open === true, повертаємо клас active-popup
        return this.open ? 'active-popup' : ''; 
      }
    }
  }

  /*
  let isOpen = false;
btnPopup.addEventListener('click', ()=> {
  isOpen = !isOpen;
  if(isOpen) {
     wrapper.classList.add('active-popup');
  }
  else {
    wrapper.classList.remove('active-popup');
  }
});
*/

// const wrapper = document.querySelector(`.wrapper`);
// const loginLink = document.querySelector(`.login-link`);
// const registerLink = document.querySelector(`.register-link`);
// const btnPopup = document.querySelector(`.btnLogin-popup`);
// const iconClose = document.querySelector(`.icon-close`);

// registerLink.addEventListener('click', ()=>{
//     wrapper.classList.add('active');
// });

// loginLink.addEventListener('click', ()=>{
//     wrapper.classList.remove('active');
// });

// btnPopup.addEventListener('click', ()=>{
//     wrapper.classList.add('active-popup');
// });

// iconClose.addEventListener('click', ()=>{
//     wrapper.classList.remove('active-popup');
// });


</script>