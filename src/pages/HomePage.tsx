import React, { FocusEvent, FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function HomePage() {


    const [currentUser, setCurrentUser] = useState<string | null>(null);


    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [returnPas, setReturnPas] = useState('')

    const [nameDirty, setNameDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [returnPasDirty, setReturnPasDirty] = useState(false)

    const [nameError, setNameError] = useState('Имя не может быть пустым');
    const [emailError, setEmailError] = useState('Email не может быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
    const [returnPasError, setReturnPasError] = useState('Пароль не может быть пустым');

    const [formValid, setFormValid] = useState(false);
    const [signIn, setSignIn] = useState(false)

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        const re = /^[a-zA-Zа-яА-ЯёЁ\s]+$/; 
        if (!re.test(String(e.target.value).toLowerCase())) {
            setNameError('Имя не должно содержать цифры или специальные символы');
        } else if (e.target.value.length < 3 || e.target.value.length > 10) {
            setNameError('Имя не может быть длинее 10 и меньше 2 символов');
            if (!e.target.value) {
                setNameError('Имя не может быть пустым');
            }
        } else {
            setNameError('');
        }
    }

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const re = (
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        if(!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный email')
            if(!e.target.value){
                setEmailError('Email не может быть пустым')
            }
        }
        else {
            setEmailError('')
        }
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if(e.target.value.length < 3 || e.target.value.length > 8){
            setPasswordError('Пароль должен быть от 3 до 8 символов')
            if(!e.target.value) {
                setPasswordError('Пароль не может быть пустым')
            }
        } else {
            setPasswordError('')
        }
    }

    const returnPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReturnPas(e.target.value);
        if(e.target.value.length < 3 || e.target.value.length > 8){
            setReturnPasError ('Пароль должен быть от 3 до 8 символов')
            if(!e.target.value) {
                setReturnPasError('Пароль не может быть пустым')
            }
             
        } if(e.target.value !== password) {
            setReturnPasError('Пароли не совпадают')
        }
         else {
            setPasswordError('')
        }
    }

    useEffect(() => {
        if (emailError || passwordError || returnPasError || password !== returnPas) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, returnPasError, password, returnPas])

    useEffect(() => {
        if (returnPas && returnPas !== password) {
            setReturnPasError('Пароли не совпадают');
        } else {
            setReturnPasError('');
        }
    }, [returnPas, password]);

    useEffect(()=> {
        const token = localStorage.getItem('token');
        if(token) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const currentUser = users.find((user:any)=> user.email === token);
            if(currentUser) {
                setName(currentUser.name);
                setCurrentUser(currentUser.name);
                setSignIn(true)
            }
        }        
    }, [])

    const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
        switch(e.target.name) {
            case 'name':
                setNameDirty(true)
            break;
            case 'email':
             setEmailDirty(true)
             break;
            case 'password':
                setPasswordDirty(true)
            break;
            case 'returnPas':
                setReturnPasDirty(true)
            break;
            default: 
            break;
            
        }
    }

    const registerHandler = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const newUser = {name, email, password};
        localStorage.setItem('users', JSON.stringify([...users, newUser]));
        localStorage.setItem('token', email);
        window.location.href = '/TeamList'
        setSignIn(true)
    }

    const [fileBase64, setFileBase64] = useState<string | null>(null); 

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileBase64) {
      localStorage.setItem('uploadedImage', fileBase64); 
      console.log('File base64 saved to localStorage:', fileBase64);
    } else {
      console.error('No file base64 to save');
    }
  };

  const convertFile = (files: FileList | null) => {
    if (files) {
      const fileRef = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileRef); 
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (ev.target?.result) {
          setFileBase64(ev.target.result.toString()); 
        }
      };
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('uploadedImage'); 
    setFileBase64(null); 
  };

  
  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage');
    if (storedImage) {
      setFileBase64(storedImage);
    }
  }, []);


  return ( <>
    {!signIn ? (<div className='flex justify-center items-center lg:h-screen mt-[50px] lg:mt-[0px]'>
        <div className='flex-column  pt-200px lg:w-[500px] w-[350px]  lg:h-[519px] top-253 lg:p-[16px] gap-24 shadow-[0px_4px_20px_0px_#00000014] box-border '>
            <div>
                <h2 className='lg:text-xl text-[20px] font-normal leading-[23.44px] text-left mb-2'>
                    Регистрация
                </h2>
            </div>
            <form onSubmit={registerHandler}>
            <div className='mb-[10px]'>
                <p className='mr-2'>Имя</p>
                
                <input type='text'
                    placeholder='Aртур'
                    value={name}
                    name='name'
                    onChange={e => nameHandler(e)}
                    onBlur={e => blurHandler(e)}
                    className='lg:w-[468px] w-[350px] h-[48px] gap-2 opacity-[0px] pl-4 pr-2 py-3 rounded-[8px] bg-[#f8f8f8]'
                ></input>
                {(nameDirty && nameError) && <p className='text-[10px] text-red-600'>{nameError}</p>}
            </div>
            <div className='mb-[10px]'>
                <p className=' mr-2'>Электронная почта</p>
                
                <input type='email'
                placeholder='example@mail.ru'
                onBlur={e => blurHandler(e)}
                name='email'
                value={email}
                onChange={e => emailHandler(e)}
                className='lg:w-[468px] w-[350px] h-[48px] gap-2 opacity-[0px] pl-4 pr-2 py-3 rounded-[8px] bg-[#f8f8f8]'
                >
                </input>
                {(emailDirty && emailError) && <p className='text-[10px] text-red-600'>{emailError}</p>}
            </div>

            <div className='mb-[10px]'>
                <p className=' mr-2'>Пароль</p>
                
                <input type='password'
                placeholder='*****'
                value={password}
                onBlur={e => blurHandler(e)}
                name='password'
                onChange={e => passwordHandler(e)}
                className='lg:w-[468px] w-[350px] h-[48px] gap-2 opacity-[0px] pl-4 pr-2 py-3 rounded-[8px] bg-[#f8f8f8]'
                >
                
                </input>
                {(passwordDirty && passwordError) && 
                <p className='text-[10px] text-red-600'>{passwordError}</p>}
            </div>

            <div className='mb-[10px]'>
                <p className=' mr-2'>Подтвердите пароль</p>
                
                <input type='password'
                placeholder='*****'
                value={returnPas}
                name='returnPas'
                onBlur={e => blurHandler(e)}
                onChange={e => returnPasswordHandler(e)}
                className='lg:w-[468px] w-[350px] h-[48px] gap-2 opacity-[0px] pl-4 pr-2 py-3 rounded-[8px] bg-[#f8f8f8]'
                >
                
                </input>
                {(returnPasDirty && returnPasError) && <p className='text-[10px] text-red-600'>{returnPasError}</p>}
            </div>
            
            
                <button disabled={!formValid} type='submit'  className='lg:w-[468px] w-full h-[48px] my-4 opacity-[0px] px-3 py-2 rounded-[8px] bg-violet-700 text-white text-[20px]'>
                    Зарегистрироваться
                </button>
            

            </form>
            
            
        
        </div>

      </div>) : (
    <div className='flex justify-center items-center lg:h-screen mt-[50px] lg:mt-[0px]'>
            <div className='lg:w-[500px] w-[350px] lg:h-[519px] top-253 lg:p-[16px] gap-24 shadow-[0px_4px_20px_0px_#00000014] box-border'>
                <h2 className='lg:text-xl text-[20px] font-normal leading-[23.44px] text-left mb-2'>
                    Добро пожаловать, {currentUser}
                </h2>
                <div className="App">
            <div className="">
            {!fileBase64 && <p> Загрузить фото...</p> }
        
                <form onSubmit={formSubmit}>
                
                {fileBase64 && (
                    <>
                    <p>Ваше фото профиля:</p>
                    <img src={fileBase64} width={200} alt="Uploaded" />
                    <hr />
                    <button className='bg-green-500 rounded text-xl text-white mr-2' type="submit">Сохранить</button>
                    <button className='bg-red-400 rounded text-xl text-white ' type="button" onClick={clearLocalStorage}>Удалить</button>
                    </>
                )} <hr /> <br />
                <input type="file" onChange={(e) => convertFile(e.target.files)} />
                </form><br />
            </div>
            </div>
            <Link className="" to={`/TeamList`}>
                <button className='bg-violet-500 w-full text-white py-3 rounded-[20px]'>Наша команда</button>
            </Link>
        </div>
        
    </div>
      ) }
      
</>
) }