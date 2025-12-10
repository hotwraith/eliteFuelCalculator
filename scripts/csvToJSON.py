import json
import copy
import csv


def main() -> None:
    filename = 'data/fuel_data.csv'
    fields = []
    rows = []

    with open(filename, 'r') as f:
        csvread = csv.reader(f)

        fields = next(csvread)
        for row in csvread:
            rows.append(row)

        for i in range(len(rows)):
            newRow = [rows[i][0], rows[i][1], rows[i][4]]
            rows[i] = newRow
    fuel_normal, fuel_sc = separate(rows)
    with open('data/fuel.json', 'w') as f:
        json.dump({'normal':fuel_normal, 'superCruise':fuel_sc}, f, indent=4)
        f.close()


def separate(rows:list[list[str]]) ->   tuple[list[list], list[list]]:
    fuel_normal = []
    fuel_sc = []
    for row in rows:
        if row[2] == 'FALSE':
            modifyRow = [float(row[0].replace(',', '.')), float(row[1].replace(',', '.'))]
            fuel_normal.append(modifyRow)
        elif row[2] == 'TRUE':
            modifyRow = [float(row[0].replace(',', '.')), float(row[1].replace(',', '.'))]
            fuel_sc.append(modifyRow)
        else:
            pass
    return fuel_normal, fuel_sc

def test() -> None: #
    matrix = [
        [10.0, 1.0],
        [2.0, 5.0]
        ]
    vect = [
        3.0,
        4.0
    ]
    for i in range(len(matrix)):
        for j in range(len(matrix)):
            coeff_temp = matrix[j][i]/matrix[i][i]
            if(j!=i):
                for z in range(len(matrix[j])):
                    matrix[j][z] = matrix[j][z] - coeff_temp*matrix[i][z]
                vect[j] = vect[j] - coeff_temp*vect[i]

    for i in range(len(vect)):
        vect[i] = vect[i]/matrix[i][i]
        matrix[i][i] = 1
    print(matrix)
    print(vect)

if __name__ == '__main__':
    main()