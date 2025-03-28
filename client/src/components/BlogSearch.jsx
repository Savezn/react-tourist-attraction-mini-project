// install axios, react-router-dom

// import axios, useState, useEffect, useNavigate

// const BlogSearch Component

// 1. เก็บค่า searchText(""), searchResults([])
// declare state 

// 2. รับค่าและเก็บค่าใน searchText 
// input tag

// 3. ดึงข้อมูลจาก server แบบ server-side filtering และเก็บค่าใน searchResults 
// const getSearchResults(text) async function

// 4. re-render ผลลัพท์ getSearchResults(text) ทุกครั้งที่ searchText มีการเปลี่ยนแปลง
// useEffect

// RR1. trigger getSearchResults(text) ครั้งแรกที่เปิดหน้าเว็บ
// useEffect

// 5. แสดงผลลัพท์ทั้งหมดที่ตรงกับคำค้นหา
// searchResults.map เพื่อ loop ชุดข้อมูลทั้งหมดใน array

// RR2. เบื้องต้นให้แสดงแค่ Title, Description และรูปภาพใหญ่ 1 รูป
// html element (div, span, p, img)

// RR3. คลิกปุ่ม “อ่านต่อ” จะต้องเปิดลิ้งค์ขึ้นมาใน Tab ใหม่ของ Web Browser
// navigate('searchResults.url')

// OR1. รายการของสถานที่ท่องเที่ยวแต่ละรายการ จะต้องแสดงรูปภาพของสถานที่ท่องเที่ยวนั้น ๆ ตามแบบในรูป UI (photo)
// .map & (div, img)

// OR2. ชื่อของสถานที่ท่องเที่ยวแต่ละรายการจะต้องเป็นลิ้งค์ที่สามารถกดเข้าไปดูรายละเอียดเพิ่มเติมได้ ซึ่งลิ้งค์นี้จะเปิดหน้าเว็บไซต์ใหม่ขึ้นมา (url)
// Link to {searchResults.url}

// OR3. สถานที่ท่องเที่ยวแต่ละรายการจะต้องแสดงหมวดหมู่ (tag)
// .map & button key={item.tag} value={item.tag}

// OR4. เมื่อ User คลิกที่หมวดหมู่จะต้องเอาข้อความที่คลิกไปใส่ลงในช่อง Input เพื่อทำการค้นหา
// onclick={() => setSearchText(`${value} `)}

// OR5. ในแต่ละรายการสถานที่ท่องเที่ยวจะมี ปุ่มสีฟ้าๆ ที่สามารถกดแล้วจะ Copy ลิ้งค์ที่สามารถกด
// ศึกษาเพิ่มจากลิงค์ DF