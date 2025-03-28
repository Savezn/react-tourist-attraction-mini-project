// import axios, useState, useEffect, useNavigate
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'boxicons';

// const BlogSearch Component
function BlogSearch() {
  // 1. เก็บค่า searchText(""), searchResults([])
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // 4. re-render ผลลัพท์ getSearchResults(text) ทุกครั้งที่ searchText มีการเปลี่ยนแปลง
  useEffect(() => {
    getSearchResults(searchText);
  }, [searchText]);

  // RR1. trigger getSearchResults(text) ครั้งแรกที่เปิดหน้าเว็บ
  useEffect(() => {
    getSearchResults(searchText);
  }, []);

  const navigate = useNavigate();

  // 3. ดึงข้อมูลจาก server แบบ server-side filtering และเก็บค่าใน searchResults
  const getSearchResults = async (text) => {
    try {
      console.log("Loading...");
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${text}`
      );
      setSearchResults(response.data.data);
    } catch (error) {
      console.log("Error");
      console.log(error);
      setSearchResults([]);
    } finally {
      console.log("finally");
    }
  };

  const style = {
    container: "flex flex-col items-center gap-4 max-w-full px-8 py-12",
    title: "text-[#2CA9E1] text-3xl font-semibold",
    searchContainer: "w-4/5 mb-6",
    searchLabel: "text-gray-600 text-sm",
    searchInput:
      "text-xs w-full border-b-2 border-b-gray-300 focus:outline-none placeholder:text-center placeholder:text-xs focus:text-center focus:placeholder-transparent",
    resultsContainer: "flex flex-col gap-8 w-full",
    tripCard:
      "flex flex-row justify-center items-center gap-4 w-full h-content",
    tripImageContainer:
      "w-64 h-42 flex justify-center items-center overflow-hidden rounded-2xl",
    tripImage: "ิmin-w-full min-h-full object-cover rounded-2xl",
    tripContent:
      "relative flex flex-col justify-start items-start gap-1 w-3/5 h-42 py-2",
    tripTitle: "text-md text-left font-medium text-gray-800 leading-5 hover:cursor-pointer",
    tripDescription: "text-xs text-gray-600 truncate w-[100ch] max-w-full",
    readMoreButton:
      "text-xs text-[#2CA9E1] underline rounded-lg hover:cursor-pointer hover:text-blue-600 transition duration-300",
    tagContainer: "flex flex-wrap space-x-2 text-xs",
    tag: "text-gray-700 text-xs underline rounded-lg hover:cursor-pointer hover:text-blue-600 transition duration-300",
    tripPhotoContainer:
      "w-full h-20 flex justify-start items-center gap-4 overflow-hidden",
    tripPhoto: "w-15 h-15 object-cover rounded-md",
    copyLinkButton: "absolute bottom-1 right-3 w-8 h-8 flex justify-center items-center border-2 border-[#2CA9E1] rounded-full hover:cursor-pointer active:ring-2 active:ring-[#2CA9E1]",
  };

  return (
    // 2. รับค่าและเก็บค่าใน searchText
    <div className={style.container}>
      <h1 className={style.title}>เที่ยวไหนดี</h1>
      <div className={style.searchContainer}>
        <h2 className={style.searchLabel}>ค้นหาที่เที่ยว</h2>
        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          className={style.searchInput}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className={style.resultsContainer}>
        {searchResults.length > 0 &&
          // 5. แสดงผลลัพท์ทั้งหมดที่ตรงกับคำค้นหา
          searchResults.map((trip) => (
            // RR2. เบื้องต้นให้แสดงแค่ Title, Description และรูปภาพใหญ่ 1 รูป
            <div key={trip.eid} className={style.tripCard}>
              <div className={style.tripImageContainer}>
                <img
                  src={trip.photos[0]}
                  alt={trip.title}
                  className={style.tripImage}
                />
              </div>
              <div className={style.tripContent}>
                {/* OR2.
                ชื่อของสถานที่ท่องเที่ยวแต่ละรายการจะต้องเป็นลิ้งค์ที่สามารถกดเข้าไปดูรายละเอียดเพิ่มเติมได้
                ซึ่งลิ้งค์นี้จะเปิดหน้าเว็บไซต์ใหม่ขึ้นมา (url)  */}
                <button onClick={() => window.open(`${trip.url}`, "_blank")} className="hover:pointer">
                  <h2 className={style.tripTitle}>{trip.title}</h2>
                </button>
                <p className={style.tripDescription}>{trip.description}</p>
                {/* RR3. คลิกปุ่ม “อ่านต่อ” จะต้องเปิดลิ้งค์ขึ้นมาใน Tab ใหม่ของ Web Browser */}
                <button
                  onClick={() => window.open(`${trip.url}`, "_blank")}
                  className={style.readMoreButton}
                >
                  อ่านต่อ
                </button>

                {/* OR3. สถานที่ท่องเที่ยวแต่ละรายการจะต้องแสดงหมวดหมู่ (tag)  */}
                {/* .map & button key={item.tag} value={item.tag} */}
                <div className={style.tagContainer}>
                  <span className="text-gray-700 text-xs">หมวด</span>
                  {trip.tags?.map((tag, index) => (
                    <button
                    key={`${trip.eid}-tag-${index}`}
                    value={searchText}
                    // OR4. เมื่อ User คลิกที่หมวดหมู่จะต้องเอาข้อความที่คลิกไปใส่ลงในช่อง Input เพื่อทำการค้นหา
                    onClick={() =>
                        searchText === ""
                          ? setSearchText(tag)
                          : setSearchText((prevText) => `${prevText} ${tag}`)
                      }
                    >
                      {index > 0 && index === trip.tags?.length - 1
                        ? "และ "
                        : ""}
                      <span className={style.tag}>{tag}</span>
                    </button>
                  ))}
                </div>
                {/* OR1. รายการของสถานที่ท่องเที่ยวแต่ละรายการจะต้องแสดงรูปภาพของสถานที่ท่องเที่ยวนั้น ๆ ตามแบบในรูป UI (photo) */}
                <div className={style.tripPhotoContainer}>
                  {trip.photos?.map(
                    (photo, index) =>
                      index !== 0 && (
                        <img
                          key={`${trip.eid}-photo-${index}`}
                          src={photo}
                          alt={`${trip.title} - Photo ${index + 1}`}
                          className={style.tripPhoto}
                        />
                      )
                  )}
                </div>
                {/* OR5. ในแต่ละรายการสถานที่ท่องเที่ยวจะมี ปุ่มสีฟ้าๆที่สามารถกดแล้วจะ Copy ลิ้งค์ที่สามารถกด  */}
                <button
                  onClick={() => navigator.clipboard.writeText(trip.url)}
                  className={style.copyLinkButton}
                >
                  <box-icon name='link' color="#2CA9E1"></box-icon>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BlogSearch;
