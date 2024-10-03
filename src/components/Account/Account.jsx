import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from '../Table/TableESP'

const Account = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState(false)
  const [val, setValue] = useState('')

  const handleClick = () =>
  {
    setIsChange(!isChange)
    setValue('')
  }
  const inputChange = (e) =>
  {
    setValue(e.target.value);
    setValue('')

  }

  return (
    <div className="w-full mr-2">
      <div className="flex justify-center mt-14">
        <div className=" border border-[#344f99]">
          <button className={` px-5 py-2 ${isChange?'bg-white text-[#344f99]':'bg-[#344f99] text-white'}`}
                        onClick={handleClick}> Đổi thông tin cơ bản </button>
          <button className={` px-5 py-2  ${!isChange?'bg-white text-[#344f99]':'bg-[#344f99] text-white'}`}
                        onClick={handleClick}> Thay đổi mật khẩu </button>

        </div>
      </div>
      {
        !isChange?(
        <div className="text-[19px] flex justify-center">
          <div className=" items-center gap-6 mb-4 mt-10 text-[19px] w-[500px]">
            <div className="">
                <p>Họ</p> <input type="text" className="text-[#afafaf] my-2 py-2 px-4 w-full border rounded-[5px] border-black"
                  value={user.firstname}></input>
            </div>
            <div className="">
                <p>Tên</p> <input type="text" className="text-[#afafaf] my-2 py-2 px-4  w-full border rounded-[5px] border-black"
                  value={user.lastname}></input>
            </div>
            <div className="">
                <p>Email</p> <input type="text" className="readonly cursor-not-allowed text-[#afafaf] my-2 py-2 px-4  w-full border rounded-[5px] border-black"
                  value={user.email}></input>
            </div>
            <div className="flex justify-center">
              <button className='my-7 bg-[#344f99] px-5 py-2 text-white rounded-[10px]'
                      type='submit'> Sửa </button>
            </div>
          </div>


        </div>

        ):(
          <div className="text-[19px] flex justify-center">
          <div className=" items-center gap-6 mb-4 mt-10 text-[19px] w-[500px]">
            <div className="">
                <p>Mật khẩu hiện tại</p> <input type="text" className="text-[#afafaf] my-2 py-2 px-4 w-full border rounded-[5px] border-black"
                 placeholder="Mật khẩu hiện tại" value={val}></input>
            </div>
            <div className="">
                <p>Mật khẩu mới</p> <input type="text" className="text-[#afafaf] my-2 py-2 px-4  w-full border rounded-[5px] border-black"
                  placeholder="Mật khẩu mới" value={val} onChange={inputChange}></input>
            </div>
            <div className="">
                <p>Nhập lại mật khẩu mới</p>
                 <input type="password" className="text-[#afafaf] my-2 py-2 px-4  w-full border rounded-[5px] border-black"
                  placeholder="Xác nhận mật khẩu mới"value={val} onChange={inputChange}></input>
            </div>
            <div className="flex justify-center">
              <button className='my-7 bg-[#344f99] px-5 py-2 text-white rounded-[10px]'
                      type='submit' value={val} onChange={inputChange}> Đổi mật khẩu </button>
            </div>
          </div>


          </div>
        )
      }
    </div>
  );
};

export default Account;
