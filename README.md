GSSlider
========
# Параметры
* **id** - id Блока контейнера_(обязательный)_
* **max** - максимальное значение_(обязательный)_
* **min** - Минимальное значение_(обязательный)_
* **step** - шаг изменения значений, если 0, то нет привязки к допустимым значениям _(по умолчанию - 0)_
* **default** - значение по умолчанию_(по-умолчанию минимальное допустимое значение)_
* **disable** - слайдер не активен_(по-умолчанию false, возможные значения: true, false)_
* **addSegments** - создавать блоки фона слайдера для установки отметок_(по-умолчанию false, возможные значения: true, false)_

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
* **setValue(_val(integer)_)** - устанавливает бегунок слайдера в значение val
* **getValue()** - возвращает значение слайдера
* **destroy()** - уничтожает слайдер
* **resize()** - обновляет размеры елементов слайдера
* **updateParams(_arr(array)_)** - обновляет параметры слайдера

***
# CSS классы
* **.gsSlider** - слайдер
* **.gsSlider.disable** - слайдер не активен
* **.gsSlider_background** - фон
* **.gsSlider_handle** - ползунок
* **.gsSlider_handle.active** - активный ползунок
* **.gsSlider_bg_segment** - часть фона
* **.gsSlider_bg_segment_even** - чётная часть фона
* **.gsSlider_bg_segment_not_even** - нечётная часть фона
* **.gsSlider_bg_segment_start** - первая часть фона
* **.gsSlider_bg_segment_end** - последняя часть фона

***
