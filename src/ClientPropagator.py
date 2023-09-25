import pandas as pd
import data


class ClientPropagator:

    def __init__(self, potential=None):
        # Список настраиваемых параметров
        self.client_traffic_ratio = 0.1  # доля заправок с трафика
        self.pop_coef = 1e10  # коэффициент населения
        self.nestro_stat_coef = -1e8  # коэффициент АЗС Nestro
        self.stat_coef = 1e8  # коэффициент других АЗС
        self.shopping_mall_coef = 1e7  # коэффициент торговых центров
        self.point_diameter_ratio = 0.05  #
        self.roads_potential = potential

        if self.roads_potential is None:
            self.total_pot = {}
            for ind, road in data.roads_df.iterrows():
                print(ind)
                pot = 0
                try:
                    l = road['len'] / len(eval(road['roads_coords']))
                    for point in eval(road['roads_coords']):
                        pot += self.calc_potential(road['Номер'], point[0], point[1])
                    self.total_pot[road['Номер']] = pot * l
                except:
                    self.total_pot[road['Номер']] = None

            roads_and_potential = data.roads_df.copy()
            roads_and_potential['potential'] = pd.Series(self.total_pot.values())
            roads_and_potential.to_excel('potential.xlsx')

    def calc_population_potential(self, road_ind, lat, lon):
        """Расчет потенциала от населения"""
        pot = 0
        for i, c in data.roads_df[data.roads_df['Номер'] == road_ind].iloc[0]['cities'].items():
            city = data.cities_df[data.cities_df['City'] == c].iloc[0]
            l2 = 0.001 + ((city['lat'] - lat) ** 2 + (city['lon'] - lon) ** 2) * 6400 ** 2
            pot += self.pop_coef * city['ratio'] / l2
        return pot

    def calc_nestro_station_potential(self, road_ind, lat, lon):
        """Расчет отталкивающего потенциала от АЗС Nestro"""
        pot = 0
        for i, ns in data.roads_df[data.roads_df['Номер'] == road_ind].iloc[0]['nestro_stations'].items():
            station = data.nestro_stations_df[data.nestro_stations_df['lat'] == ns].iloc[0]
            l2 = 0.001 + ((station['lat'] - lat) ** 2 + (station['lon'] - lon) ** 2) * 6400 ** 2
            pot += self.nestro_stat_coef / l2
        return pot

    def calc_shopping_mall_potential(self, road_ind, lat, lon):
        """Расчет потенциала от ТЦ"""
        pot = 0
        for i, sm in data.roads_df[data.roads_df['Номер'] == road_ind].iloc[0]['shopping_malls'].items():
            sh_mall = data.shopping_malls_df[data.shopping_malls_df['lat'] == sm].iloc[0]
            l2 = 0.001 + ((sh_mall['lat'] - lat) ** 2 + (sh_mall['lon'] - lon) ** 2) * 6400 ** 2

            pot += self.shopping_mall_coef * sh_mall['rating'] * sh_mall['user_ratings_total'] / 1000 / l2
        return pot

    """Расчет потенциала от других АЗС"""

    def calc_station_potential(self, road_ind, lat, lon):
        """Расчет отталкивающего потенциала от АЗС Nestro"""
        pot = 0
        for i, s in data.roads_df[data.roads_df['Номер'] == road_ind].iloc[0]['other_stations'].items():
            station = data.other_stations_df[data.other_stations_df['lat'] == s].iloc[0]
            l2 = 0.001 + ((s['lat'] - lat) ** 2 + (s['lon'] - lon) ** 2) * 6400 ** 2
            pot += self.nestro_stat_coef / l2
        return pot

    """Вычисление полного потенциала точки"""

    def calc_potential(self, road_ind, lat, lon):
        return self.calc_population_potential(road_ind, lat, lon) + \
            self.calc_nestro_station_potential(road_ind, lat, lon) + self.calc_station_potential(
                road_ind, lat, lon)

    """Линейно переводит промежуток (a, b) в (A, B)"""

    def linear_transform(self, x, a, b, A, B):
        return (B * a - A * b) / (a - b) + (A - B) / (a - b) * x

    def propagate(self, road_ind, lat, lon):
        """Предсказывает количество клиентов"""
        road = data.roads_df[data.roads_df['Номер'] == road_ind]
        clients = self.client_traffic_ratio * data.traffic_df[data.traffic_df['Number'] == road_ind].iloc[0]['traffic']
        pot = self.calc_potential(road_ind, lat, lon)
        total_pot = self.roads_potential.iloc[road.index[0]] if self.roads_potential is not None \
            else self.total_pot[road_ind]
        return pot * self.point_diameter_ratio * road['len'].iloc[0] / total_pot

    def find_places(self, road_ind):
        points = {}
        road = data.roads_df[data.roads_df['Номер'] == road_ind].iloc[0]
        for point in eval(road['roads_coords']):
            points[tuple(point)] = self.propagate(road_ind, point[0], point[1])
        return {
            i: self.linear_transform(j, min(points.values()), max(points.values()), 0, 1) * self.client_traffic_ratio *
               data.traffic_df[data.traffic_df['Number'] == road_ind].iloc[0]['traffic'] for i, j in points.items()}

