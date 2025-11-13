import React, {useState, useRef, useEffect} from "react"
import './Carousel.css'


const importAll = (r) => r.keys().map(r); //функция для взятия каждой картинки из папки
const images = importAll(require.context('/public/prev/' //все картинки из папки сразу
    , false, /\.(png|jpe?g|svg)$/)); //форматы которые подойдут

const Carousel = ({ direction }) => {
    const carouselRef = useRef(null); //действие (наведение мышки)
    const [isHovered, setIsHovered] = useState(false); //проверка действия
    const requestIdRef = useRef(null); //id анимации
    const startPositionRef = useRef(0); //текущая позиция
    const [selectedImage, setSelectedImage] = useState(null); //картинка выбранная

    
    const closeModal = () => { //функция закрытия модального окна
        setSelectedImage(null);
    };

    //анимация карусели картинок
    useEffect(() => {
        const carousel = carouselRef.current;

        const animate = () => {
            if (!isHovered) { //проверка состония наведения мышки, если не - то
                startPositionRef.current += direction === 'left' ? -0.3 : 0.3; //двигаем
                //проверки для проверки дохождения до края картинок
                if (startPositionRef.current >= carousel.scrollWidth / 2) {
                    startPositionRef.current = 0; //запускаем в начало анимацию
                } else if (startPositionRef.current <= 0) {
                    startPositionRef.current = carousel.scrollWidth / 2; //в конец
                }
                carousel.scrollLeft = startPositionRef.current; //применение анимации
            }
            requestIdRef.current = requestAnimationFrame(animate); //запуск кадров анимации
        };

        requestIdRef.current = requestAnimationFrame(animate); //запуск анимации

        return () => cancelAnimationFrame(requestIdRef.current); //проверка если да - то стоп анимация
    }, [direction, isHovered]); //то за чьим изменениями состояние следим
    // jsx
    return (
        <div
            className="carousel-container"
            ref={carouselRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className="carousel-content">
                {images.map((image, index) => (
                    <img key={index} src={image} className="carousel-image"
                    onClick={() => setSelectedImage(image)}/>
                ))}
                {images.map((image, index) => (
                    <img key={index} src={image} className="carousel-image"
                    onClick={() => setSelectedImage(image)}/>
                ))}
            </div>
            {selectedImage && (
                <div className="modal-window-image" onClick={closeModal}>
                    <div style={{ display: "flex" }} onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="" className="modal-image" />
                        <p><button onClick={closeModal}
                        className="modal-image-close-button"></button></p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carousel;