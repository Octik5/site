import React, {useState, useEffect, useRef} from "react"; //память состояния, действия (эффекты) (получение данных при первой загрузки компонента), доступ к элементам (ссылки). (хуки)
import ModalWindow from './ModalWindow';
import Carousel from "./Carousel";
import Review from "./Review";

//разный способ записи
const Main = () => { //компонент главный (стрелочная функция)
  const [showModal, setShowModal] = useState(false); //состояние для модального окна. on off. по умолчанию false

  const handleOpenModal = () => { //функции открытия модального окна
    setShowModal(true);
  };

  const handleCloseModal = () => { //функции закрытия модального окна
    setShowModal(false);
  };

  const containerRef = useRef(null);
  const reviewWidthRef = useRef(0);

  const reviews = [ //массив отзывов
    <Review key={1} name='Владислав М.' link='https://t.me/octik5'
    text='Текст отзыва, оставленного клиентом в Телеграм канале,
    который можно открыть нажав на кнопку в правом верхнем
    углу этого блока.'/>,
    <Review key={2} name='Максим Л.' link='https://t.me/octik5'
    text='Отзыв оставленный Максимом'/>,
    <Review key={3} name='Вячеслав К.' link='https://t.me/octik5'
    text='Подписывайся на телеграм канал t.me/octik5'/>,
  ];

  const visibleReviews = 3; //сколько начально видно отзывов

  //основа для отзывов
  const handleScroll = () => {
    const box = containerRef.current; //сам блок
    const width = reviewWidthRef.current * visibleReviews; //его ширина
    
    if (box.scrollLeft <= 0) {
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = box.scrollWidth - 2 * width;
      box.style.scrollBehavior = 'smooth';
    }

    if (box.scrollLeft >= box.scrollWidth - width) {
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = width;
      box.style.scrollBehavior = 'smooth';
    }
  };

  //кнопки
  const btnPrevReview = () => { //лево
    const box = containerRef.current;
    box.scrollLeft -= reviewWidthRef.current;
  };

  const btnNextReview = () => { //право
    const box = containerRef.current;
    box.scrollLeft += reviewWidthRef.current;
  };

  //анимация прокрутки плавная
  useEffect(() => {
    const box = containerRef.current;
    const firstReview = box.querySelector('.review-card');
    reviewWidthRef.current = firstReview.clientWidth;
    const width = reviewWidthRef.current * visibleReviews;

    box.scrollLeft = (box.scrollWidth - width) / 2;
    box.addEventListener('scroll', handleScroll);

    return () => {
      box.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [scroll, setScroll] = useState(0); //счетчик прокрутки | считали, записали (прокрутка страницы)

  const scrollUp = () => {
    setScroll(window.scrollY); //запоминалка счетчика прокрутки
  }

  const upButton = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); //прокрутка вверх самый "обомне"
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollUp); //функция ожидания нажатия "обомне"
  }, []);

  const toBlock = (height) => {
    window.scrollTo({ top: height, left: 0, behavior: 'smooth' }); //функция прокрутки вверх для остальных кнопок
  }

  //начало jsx
  return (
    <div>
      {/* шапка */}
      <header>
        <div className="navigation">
          <div className="menu">
            <a onClick={upButton}>Обо мне</a>  {/* обработка события */}
            <a onClick={(e)=>toBlock(e.target.getAttribute('height'))} height="700">Услуги</a>
            <a onClick={(e)=>toBlock(e.target.getAttribute('height'))} height="1230">Портфолио</a>
            <a onClick={(e)=>toBlock(e.target.getAttribute('height'))} height="1920">Отзывы</a>
            <a onClick={(e)=>toBlock(e.target.getAttribute('height'))} height="2600">Гарантии</a>
          </div>

          <div className="header-buttons">
            <button onClick={handleOpenModal} className="btn">Связаться</button>

            <a href="https://t.me/octik5" target="_blank" rel="noreferrer"
            className="icon telegram" />
            <a href="https://www.instagram.com/octi64x21212/" target="_blank" rel="noreferrer"
            className="icon instagram" />

          </div>
        </div>
      </header>
      {/* Модальное окно */}
      <ModalWindow show={showModal} onClose={handleCloseModal}>
        <h2 style={{color: "#4824ff", fontSize: "40px"}}>Контакты</h2>
        <p style={{fontSize:"22px"}}>Вы можете связаться со мной в Телеграм <br/> или Инстаграм</p>

      </ModalWindow>
      {/* блок начальный */}
      <div className="welcome-block">
        <div className="first-block">
          <h1>Веб-дизайн <span className="title">Workford</span>
              </h1>
          <h2 style={{marginBottom: "7%", marginTop: "7%"}}>
            Создаю <span style={{color:"#4824ff"}}>
            продаваемый</span><br/>
            и <span style={{color:"#4824ff"}}> уникальный </span>
            дизайн <br/> под ваши запросы</h2>
          <h3>Занимаюсь веб-дизайном<br/>
              на протяжении <span style={{color:"#4824ff"}}>9 лет
              </span></h3>
        </div>

        <div className="main-image-box">
          <img className="first-image-layer" src='./images/1.png'/>
        </div>
      </div>
      {/* блок услуги */}
      <div className="service-block" draggable="false">
        <h1 style={{fontSize:"52px"}}>УСЛУГИ</h1>
        <p style={{fontSize:"27px"}}Создаю>
          <span style={{color:"#4824ff"}}> статический
          дизайн </span> по следующим направлениям:</p>
        
        <div style={{display:"flex"}}>
          <p className="tag"><p className="tag-icon"/>
          Рекламные баннеры</p>
          <p className="tag"><p className="tag-icon"/>
          Превью для видео</p>
          <p className="tag"><p className="tag-icon"/>
          Оформление каналов</p>
          <p className="tag"><p className="tag-icon"/>
          Инфографика</p>
        </div>
        <div style={{display:"flex", marginTop:"16px"}}>
          <p className="tag"><p className="tag-icon"/>
          Превью для Инстаграм</p>
          <p className="tag"><p className="tag-icon"/>
          Оформление для фесбука</p>
        </div>

        <p style={{fontSize:"27px"}}>Открыт для обсуждения 
        создания дизайна и по другим направлениям. <br/>
        Детальней готов обсудить при
        <span style={{color:"#4824ff",cursor:"pointer"}}
          onClick={handleOpenModal}> личной переписке</span>.</p>
      </div>
      {/* блок портфолио */}
      <div className="portfolio-block">
        <div className="first-block">
          <h1 className="main-title">Портфолио</h1>
          <div style={{ position: "absolute", marginLeft: "-660px" }}>
            <p className="gradient-part-one"></p>
            <p className="title-border">Портф</p>
          </div>
          <div style={{position:"absolute", marginLeft:"620px"}}>
            <p className="gradient-part-two"></p>
            <p className="title-border">Фолио</p>
          </div>
          <img className="array-icon" src='./icons/arrow-down.png'
          draggable="false"/>
        </div>

        <div className="content" style={{marginLeft: "-5vw", marginRight: "-5vw", overflow: "hidden"}}>
            <Carousel direction="left"/>
            <Carousel direction="right"/>
        </div>
      </div>
      {/* блок отзывов */}
      <div className="review-block">
        <h1>ОТЗЫВЫ</h1>
        <p className="description">Отзывы клиентов,
          написанные со своих
          <span className="selecting"> личных аккаунтов </span>
          Телеграм. Всё прозрачно! <br/> Любой отзыв
          можно<span className="selecting"> открыть </span> в
          Телеграм и<span className="selecting"> спросить </span> об
          впечатлениях работы со мной <br/>
          у создателя отзыва лично.</p>
        <div className="review-carousel">
          <div className="review-container" ref={containerRef}>
            {reviews.slice(-visibleReviews)}
            {reviews}
            {reviews.slice(0, visibleReviews)}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <p className="next-button" style={{ transform: "rotate(180deg)" }}>
            <p className="array-next-icon" onClick={btnPrevReview}/>
          </p>
          <p className="next-button">
            <p className="array-next-icon" onClick={btnNextReview}/>
          </p>
        </div>
      </div>
      {/* блок гарантий */}
      <div className="guarantees-block">
        <h1 style={{ fontSize: "52px", paddingBottom: "20px" }}>
          ГАРАНТИИ</h1>

        <ol className="guarantees-points">
          <li className="point">
            Оплату принимаю через платёжную систему
            <span style={{ color: "#4824ff" }}> СБП </span>
            которая контролирует <br/>безопасность денежных переводов.
          </li>
          <li className="point">
            Убедится в моей ответственности и профессионализме можно <span style={{ color: "#4824ff" }}> написав клиентам</span>,<br/> оставивших отзывы
            <span style={{ color: "#4824ff" }}> лично </span>
            в любой момент (отзывы клиентов выше).
          </li>
          <li className="point">
            Все <span style={{ color: "#4824ff" }}> авторские права </span>на работу переходят заказчику после выполнения заказа.
          </li>
        </ol>
      </div>
      {/* подвал */}
      <div className="footer">Workford</div>
    </div>
  );
}

export default Main;
