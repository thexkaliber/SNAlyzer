from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select

import logging
import pandas as pd

chrome_options = Options()
chrome_options.add_experimental_option("prefs", {
  "download.prompt_for_download": False,
  "plugins.always_open_pdf_externally": True,
  "download.open_pdf_in_system_reader": False,
})

logging.basicConfig(
    level=logging.DEBUG,
    format="{asctime} {levelname:<8} {message}",
    datefmt="%d-%m-%Y %H:%M:%S",
    style='{',
    filename='./snalyzer/public/scrapping_logs.log',
    filemode='a'
)
logging.info('Search Event Initiated.')
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(options=chrome_options)

driver.command_executor._commands["send_command"] = ("POST", '/session/$sessionId/chromium/send_command')
params = {'cmd': 'Page.setDownloadBehavior', 'params': {'behavior': 'allow', 'downloadPath': "C:\\Users\\user\\snalyzer\\snalyzer\\public"}}
command_result = driver.execute("send_command", params)


driver.get('https://loksabha.nic.in/Legislation/newadvsearch.aspx')
driver.find_element(By.CSS_SELECTOR,"input[type='radio'][value='All']").click()
driver.find_element(By.CSS_SELECTOR,"input[type='radio'][value='ls']").click()
driver.find_element(By.CSS_SELECTOR,"input[type='radio'][value='6']").click()
driver.find_element(By.CSS_SELECTOR,"input[type='radio'][value='Current']").click()
driver.find_element(By.CSS_SELECTOR,"input[type='submit'][value='Submit']").click()
select_fr = Select(driver.find_element(By.ID,"ContentPlaceHolder1_ddlfile"))
select_fr.select_by_index(1)

a_tags = driver.find_elements(By.XPATH, "//a")
for a in a_tags:
    if a.get_attribute('id') and "ContentPlaceHolder1_Linkbutton27" in a.get_attribute('id') and 'Download' in a.text:
        a.click()

logging.info('Searching Event Complete.')

logging.info('Conversion Event Started')
read_file = pd.read_html("./snalyzer/public/BillSearch.xls")


# Write the dataframe object
# into csv file
read_file[1].to_csv ("./snalyzer/public/BillSearch.csv", 
                  index = None,
                  header=False)

read_file = pd.read_csv("./snalyzer/public/BillSearch.csv")
read_file = read_file[read_file['Year'] >= 2020]
read_file.to_csv ("./snalyzer/public/BillSearch.csv", 
                  index = None,
                  header=True)
try:
    read_file.close()
except:
    pass    

logging.info('Conversion Event Finished')
