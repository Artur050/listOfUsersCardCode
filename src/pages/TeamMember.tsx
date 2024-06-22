import { Character } from '../models/models';
import { useGetCharacterByIdQuery } from '../store/rickAndMortyApi/rickAndMortyApi';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { CiMail } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import { useMediaQuery } from 'react-responsive'
import back from '../assets/back.svg'
import Vector from '../assets/Vector.svg'


export default function TeamMember() {
    const [_isLoggedIn, setIsLoggedIn] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

    const {id} = useParams<Record<string, string | undefined>>();
    const {data, error, isLoading} = useGetCharacterByIdQuery(id || '');
    console.log(data);
    

    if(isLoading) return <div>Loading...</div>

    if(error) return <div>Error occurred</div>

    const user = data as Character

    const handleGoBack = () => {
      window.history.go(-1)
    }

    const logoutHandler = () => {
      localStorage.removeItem('token');
      window.location.href = '/'
      setIsLoggedIn(false);
    }

  return (
    <div>
      
      <div className='bg-[#512689] h-[412px] lg:h-[265px] flex items-center justify-center lg:justify-start lg:pl-[200px]'>
            <div className='lg:w-[81px] lg:h-[38pxpx] lg:gap-2 lg:border lg:px-4 lg:py-2 lg:rounded-[8px] lg:left-[80px] lg:top-[32px] absolute text-white
            top-5 left-4'>
            {isMobile ? (<button onClick={handleGoBack}>
              <img src={back} alt="" />
            </button>): (<button 
               onClick={handleGoBack}
              >Назад</button>) }
              
            </div>

              {isMobile ? (<div className='flex-col gap-[30px] justify-center'>
                <div className='flex-col text-center justify-center items-center mb-6 ' >
                <p className='text-[36px] text-white'>{user.name}</p>
                <p className='text-[20px] text-white'>Lorem</p>
              </div>
              <img className=' mx-[auto] w-[187px] h-[187px] rounded-[50%] ' src={user?.image} alt={`${user?.name}`} />
              
            </div>) : (<div className='flex gap-[20px]'>
              <div className='flex justify-center items-center'>
              <img className='w-[187px] h-[187px] rounded-[50%] ' src={user?.image} alt={`${user?.name} `} />
              </div>
              <div>
                <p className='text-[36px] lg:text-[64px] text-white'>{user?.name}</p>
                <p className='text-[40px] text-white'>Lorem</p>
              </div>
            </div>)}
              
            <div className='lg:w-[81px] lg:h-[38pxpx] lg:gap-2 lg:border opacity-[0px] px-4 py-2 rounded-[8px] lg:left-[1279px] lg:top-[32px] absolute right-2 top-3 text-white'>
            {isMobile ? (<button onClick={logoutHandler}>
              <img src={Vector} alt="" />
            </button>): (<button 
               onClick={logoutHandler}
              >Выйти</button>) }
            </div>
      </div>
      
      
      {isMobile ? (<div className='flex-col items-center justify-start ml-3 mt-[30px] w-[350px]'>
        <div className=' mb-4'>
          <p className='flex justify-start items-center gap-1'><IoIosCall className=' text-[#512689]' /> + 7 777 777 77 77</p>
          <p className='flex justify-start items-center gap-1'> <CiMail className=' text-[#512689]' /> {user.gender}</p>
          
        </div>
        <div className='w-[350px]'>
          <p className=' mb-[10px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis molestiae culpa nobis voluptatum quo blanditiis earum distinctio porro eveniet saepe!</p>
          <p className=' mb-[10px]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, dicta?</p>
          <p className=''>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad sequi error repudiandae deserunt odit beatae dicta nostrum exercitationem soluta eum?</p>
      </div>
        
      </div>) : (<div className='flex ml-[200px] mt-[30px]'>
        <div className='w-[630px]'>
          <p className=' mb-[10px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis molestiae culpa nobis voluptatum quo blanditiis earum distinctio porro eveniet saepe!</p>
          <p className=' mb-[10px]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, dicta?</p>
          <p className=''>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad sequi error repudiandae deserunt odit beatae dicta nostrum exercitationem soluta eum?</p>
        </div>
        <div className=''>
          <p className=' flex justify-start items-center gap-1'><IoIosCall className=' text-[#512689]' /> + 7 777 777 77 77</p>
          <p className='flex justify-start items-center gap-1'> <CiMail className=' text-[#512689]' /> {user?.gender}</p>
          
        </div>
      </div>)}
      
    </div>
  )
}
