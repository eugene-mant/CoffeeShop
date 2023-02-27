<styles lang="scss">
 
.footer-pv {
        height: 8rem;
        background: #666;
}
// Fonts
$font-sans-family:sans-serif;
$font-serif-family:serif;
  
// Colors
$header-color:#090909;
$paragraph-color:#090909;

// Facts
$fact-question-color:$header-color;
$fact-question-color-active:#808080;

// Media Sizes
$mobile:"max-width:767px";

.parent-container {
  padding:0 20px 0 20px;
  max-width:800px;
  width:100%;
}
.faq {
  list-style:none;
  padding-left:40px;
  padding-right:20px;
  li {
    border-bottom:1px solid #999999;
    margin-bottom:15px;
    &.active {
      .answer {
        max-height:275px !important;
        padding-bottom:25px;
        transition: max-height 0.5s ease, padding-bottom 0.5s ease;
      }
      .question {
        color:$fact-question-color-active;
        transition:color 0.5s ease;
      }
    }
  }
  .answer {
    color:$paragraph-color;
    font-family:$font-serif-family;
    font-size:16px;
    line-height:24px;
    max-height:0;
    overflow:hidden;
    transition:max-height 0.5s ease, padding-bottom 0.5s ease;
  }
  .plus-minus-toggle {
    cursor: pointer;
    height: 21px;
    position: absolute;
    width: 21px;
    left:-40px;
    top:50%;
    z-index:2;

    &:before,
    &:after {
      background: #000;
      content: '';
      height: 5px;
      left: 0;
      position: absolute;
      top: 0;
      width: 21px;
      transition: transform 500ms ease;
    }

    &:after {
      transform-origin: center;
    }

    &.collapsed {
      &:after {
        transform: rotate(90deg);
      }

      &:before {
        transform: rotate(180deg);
      }
    }
  }
  .question {
    color:$fact-question-color;
    font-family:$font-sans-family;
    font-size:20px;
    font-weight:800;
    text-transform:uppercase;
    position:relative;
    cursor:pointer;
    padding:20px 0;
    transition:color 0.5s ease; 
    @media screen and ($mobile) {
      font-size:18px;
    }
  }
}
  .footer-pv {
    background-color: #f5f5f5;
    padding: 20px 0;
    .footer-pv-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      .footer-pv-content-left {
        display: flex;
        align-items: center;
        .footer-pv-content-left-logo {
          width: 100px;
          height: 100px;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .footer-pv-content-left-text {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          span {
            margin-right: 10px;
          }
        }
      }
      .footer-pv-content-right {
        display: flex;
        align-items: center;
        .footer-pv-content-right-item {
          margin-right: 20px;
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          a {
            color: #666;
            text-decoration: none;
          }
        }
      }
    }
  }
</styles>

<template>
  <div class="footer-pv">
    <div class="footer-pv-content">
      <div class="footer-pv-content-left">
        <div class="footer-pv-content-left-logo">
          <img src="https://images.vexels.com/media/users/3/149532/isolated/preview/7ecd44f018ccc3e0bfe0c5f22b925a29-coffee-shop-take-away-badge.png" alt="">
        </div>
        <div class="footer-pv-content-left-text">
          <span>Copyright © 2023</span>
          <span>Coffee Shop</span>
          <span>All Rights Reserved</span>
        </div>
      </div>
      
      <div class="footer-pv-content-right">
        <div class="footer-pv-content-right-item">
          <a href="" target="_blank">Twitter</a>
        </div>
        <div class="footer-pv-content-right-item">
          <a href="" target="_blank">Instagram</a>
        </div>
        <div class="footer-pv-content-right-item">
          <a href="" target="_blank">Facebook</a>
        </div>
        <div class="footer-pv-content-right-item">
          <a href="/faq" target="_blank">FAQ</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


</script>