# Хакатон Nestro 2023 
Сертификат [Certificate_2023-10-17_22_35_09.188Z.pdf](https://github.com/karimvafin/NestroHackathon/files/12967970/Certificate_2023-10-17_22_35_09.188Z.pdf)
Условие: https://drive.google.com/drive/folders/1RPAuaBL8BsY9ikYQtj5OR1ZfVIIdJo0s
Презентация: [Road Analyzer (1) (1).pdf](https://github.com/karimvafin/NestroHackathon/files/12967996/Road.Analyzer.1.1.pdf)



В этом репозитории содержится исходный код для решения 1-го трека хакатона (задача "Где заправка?") 

Решение задачи состоит из трех частей:
1. Прогноз трафика на дорогах
2. Прогноз количества потенциальных клиентов и наиболее выгодных расположений АЗС
3. Прогноз прибыли и количества реализуемого топлива

На первом этапе для каждой дороги оценивается количество автомобилей, проезжающих в день. В данной модели учитываются данные о загруженности дорог, близость больших населенных пунктов и торговых центров. 

На втором этапе используется метод гравитационных потенциалов для задачи геомаркетинга. После оценки трафика оценивается количество потенциальных клиентов и находятся точки с наибольшей доходностью, при этом расчитываются потенциалы для следующих параметров: близость городов с большой плотностью населения, АЗС Nestro, АЗС других компаний, торговые центры.

На третьем этапе рассчитывается прибыльность точки исходя из данных о потенциальных клиентах, оценивается средний чек за два пункта: топливо и дополнительный ассортимент (ДАС), при этом учитывается торговая площадь.

# Входные и выходные данные модели

На вход модели загружаются следующие данные (примеры данных находятся в папке data):
- список анализируемых дорог (roads.xlsx)
- список крупных городов Боснии и Герцеговины с координатами (latlonCities.xlsx)
- список учитываемых торговых центров (shopping_mall.xlsx)
- список АЗС Nestro (latlonNestroStations.xlsx) и других компаний (gas_stations.xlsx) с географическими координатами

На выход модель выдает наиболее выгодные точки размещения АЗС для каждой дороги и потенциальную доходность этих точек.
