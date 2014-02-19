GSSlider
========
# Параметры
* **id** - id Блока контейнера(обязательный)
* **max** - максимальное значение(обязательный)
* **min** - Минимальное значение(обязательный)
* **step** - шаг изменения значений, если 0, то нет привязки к допустимым значениям (по умолчанию - 0)
* **default** - значение по умолчанию(по-умолчанию минимальное допустимое значение)

***

# Callback
* **onStart** - возникает при нажатии на ползунок
* **onEnd** - возникает отпускают ползунок
* **onUpdateValue** - возникает при обновлении значения
* **onClick** - возникает при клике на задний фон
* **onMove** - возникает при движении ползунка


_Если в функции обработчике вернуть false, то текущее действие(к примеру сохранение) будет прервано_


***

# Методы
* **setValue(_val_)** - устанавливает бегунок слайдера в значение val
* **getValue()** - возвращает значение слайдера
* **destroy()** - уничтожает слайдер
* **resize()** - обновляет размеры елементов слайдера

***
