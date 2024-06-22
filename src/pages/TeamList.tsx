import { Link } from 'react-router-dom';
import { useGetCharactersQuery } from '../store/rickAndMortyApi/rickAndMortyApi'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Vector from '../assets/Vector.svg'
import { MdNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import { useAppSelector } from '../hooks/redux';
import { RootState } from '../store/index';
import { useActions } from '../hooks/actions';
import { FaHeart, FaRegHeart } from 'react-icons/fa';


export default function TeamList() {

  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [currentPage, setCurrentPage] = useState(1);

 const {data, isError} = useGetCharactersQuery({ page: currentPage }, {
  refetchOnFocus: true
 });

const favourites = useAppSelector((state: RootState) => state.favourites.users);
const {addFavourite, removeFavourite} = useActions();

const handleAddToFavourite = (userId: string) => {
  addFavourite(userId);
};

const handleRemoveFromFavourite = (userId: string) => {
  removeFavourite(userId);
};

  useEffect(()=> {
    const token = localStorage.getItem('token');
    if(token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('token');
    window.location.href = '/'
    setIsLoggedIn(false);

  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className=''>
      {isError && <p>ERROR</p>}
            {isLoggedIn ? (
                <div className="container mx-auto ">
  <div className="bg-[#512689] h-[265px] flex flex-col items-center pt-10 mb-10">
    <h2 className="text-center text-[32px] md:text-[64px] text-white">Наша команда</h2>
    <h3 className="text-center text-[16px] md:text-[20px] text-white mx-auto w-[334px] lg:w-[846px]">
      Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.
    </h3>
    {isMobile ? (<div className="">
        <button className='right-5 top-10 absolute' onClick={logoutHandler}>
         <img src={Vector} />
        </button>
    </div>) : (
      <div className="w-[81px] h-[38px] gap-2 border opacity-1 px-4 py-2 rounded-[8px] lg:left-[1279px] top-20; absolute text-white">
      <button onClick={logoutHandler}>
       Выйти
      </button>
  </div>
    )  }
    
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2em] justify-items-center">
  {data?.map((user: any) => (
      <div className="lg:flex flex-col items-center text-center justify-center pt-[35px] box-border w-[305px] lg:w-[305px] h-[263px] lg:h-[263px] rounded-[10px_0px_0px_0px] shadow-[0px_1px_3.98px_0px_#33333326]" key={user.id}>
        <Link className="inline-block" to={`/user/${user.id}`}>
          <img className="w-[124px] h-[124px] rounded-full" src={user.image} alt={`${user.first_name} ${user.last_name}`} />
        </Link>
        <p>{user.name}</p>
        <div className="status-indicator flex items-center justify-center">
            <div className={`w-3 h-3 rounded-full ml-2 ${user.status === 'Alive' ? 'bg-green-500 mr-2' : user.status === 'Dead' ? 'bg-red-500 mr-2' : 'bg-gray-500 mr-2'}`}></div>
            <p>{user.status}</p>
        </div>
        <button 
            onClick={() =>
              favourites.includes(user.id) ? handleRemoveFromFavourite(user.id) : handleAddToFavourite(user.id)
            }
            className={`favourite-button ${favourites.includes(user.id) ? 'active' : ''}`}
          >
            {favourites.includes(user.id) ? <FaHeart className="text-red-500 ml-[240px]" /> : <FaRegHeart className='ml-[240px]' />}
          </button>
      </div>
    ))}
  </div>

  <div className="flex justify-center mt-4 gap-4">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <GrFormPrevious />
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
              onClick={nextPage}
            >
              <MdNavigateNext />
            </button>
          </div>
</div>
            ) : (
                <div className=' flex-col text-center text-[40px] justify-center items-center'>
                    <h2 className=' mt-9 mb-20'>Зарегистрируйтесь, чтобы данные отображались</h2>
                    <a className=' bg-violet-500 text-white 
                    shadow-[0_8px_32px_0_rgba(_31,38,135,0.37_)] backdrop-blur-[_4px_] border rounded-[10px] border-solid border-[rgba(_255,255,255,0.18_)] px-5 py-3' href="/">
                    Регистрация</a>
                    <br />
                </div>
            )}
    </div>
    
  )
}