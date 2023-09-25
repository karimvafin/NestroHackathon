'''
Модуль рассчитывает средний чек на заправке
'''
def average_expenses(clients_number):
    """
        Args:
            clients (int): количество клиентов на заправке за период
        Returns:
            revenue: list[выручка от топлива, выручка от ДАС] за пероид
    """
    fuelPrice = [1.432, 1.483]  # цена на [95 бензин, дизель] в 2023 году за литр
    tankCapacity = [50, 500]  # обьем бака у легкового авто и фуры

    transportType = [0.7, 0.3]

    fuelRev = clients_number * (
                transportType[0] * fuelPrice[0] * tankCapacity[0] + transportType[1] * fuelPrice[1] * tankCapacity[1])
    DASrev = fuelRev * 0.1

    return [fuelRev, DASrev]


