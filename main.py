import pandas as pd
import csv
import os


# Creating separate csv files for drugs names
def seperating_file(filename, drug_name):
    # Read data from csv and group it by Product name
    data = pd.read_csv(filename)
    grouped_data = data.groupby('Product')

    drugn = grouped_data.get_group(drug_name)
    # Created an empty csv file
    with open(f"{drug_name}.csv", "w", newline="") as outfile:
        writer = csv.writer(outfile)

    # Added values to new csv file
    drugn.to_csv(f'{drug_name}.csv', mode='a', header=True)


# Sum the rows
def sum_frame_by_column(new_col_name, list_of_cols_to_sum, drug_name):
    data = pd.read_csv(f'{drug_name}.csv')
    data[new_col_name] = data[list_of_cols_to_sum].astype(float).sum(axis=1)
    data.to_csv(f"{drug_name}_summed.csv")
    print(data)
    return data


# Order csv file by totals
def total(drug_name):
    new_file = f'{drug_name}_summed.csv'
    gf = pd.read_csv(new_file)

    gf.sort_values(['TRx_Total'],
                   axis=0,
                   ascending=[False],
                   inplace=True)
    gf.to_csv(f'{drug_name}_total.csv')




# Delete unnecessary files
def delete(filename):
    os.remove(f"{filename}.csv")
    os.remove(f"{filename}_summed.csv")
    os.remove(f"{filename}_total.csv")

#Deleting first columns
def deleting_first_columns(filesname):
    df = pd.read_csv(f'{filesname}_total.csv')
    df.drop(df.columns[[0,1,2,3]], axis=1, inplace=True)
    df.to_csv(f'{filesname}_drug.csv')
    print(df)


seperating_file('Prescriber_Data.csv', "Zap-a-Pain")
sum_frame_by_column('TRx_Total',
                    ['TRx_Month_1',
                     'TRx_Month_2',
                     'TRx_Month_3',
                     'TRx_Month_4',
                     'TRx_Month_5',
                     'TRx_Month_6'],
                    "Zap-a-Pain")
total("Zap-a-Pain")
deleting_first_columns("Zap-a-Pain")
delete("Zap-a-Pain")