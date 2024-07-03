from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import logging
#The code provided only works in the Legacy Sansad Website. Since the publishing of this work, the Sansad website has been renovated.

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
logging.info('Scraping Event Initiated.')
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(options=chrome_options)

driver.command_executor._commands["send_command"] = ("POST", '/session/$sessionId/chromium/send_command')
params = {'cmd': 'Page.setDownloadBehavior', 'params': {'behavior': 'allow', 'downloadPath': "C:\\Users\\user\\snalyzer\\snalyzer\\src\\python\\data\\loksabha-questions"}}
command_result = driver.execute("send_command", params)

driver.get('https://loksabha.nic.in/Questions/questionlist.aspx')

a_tags = driver.find_elements(By.XPATH, "//a")
for a in a_tags:
    if a.get_attribute('href') and "javascript:openinNewWindow('ContentPlaceHolder1_pdfiframe');" in a.get_attribute('href') and 'Open PDF in New Window' in a.text:
        a.click()

logging.info('Scraping Event Complete.')
