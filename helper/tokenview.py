
from typing import Text
from selenium import webdriver
from selenium.webdriver.common import keys
from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.support.ui import Select
import time
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


options = webdriver.ChromeOptions()

options.add_argument('--headless')
# options.add_argument("--window-size=1920,1080")

options.add_argument('--log-level=1')
options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36")
# options.add_argument("--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36")
options.add_experimental_option ('excludeSwitches', ['enable-logging'])
options.add_experimental_option("excludeSwitches", ["enable-automation"])
#cloudflare bypass
options.add_experimental_option('useAutomationExtension', False) 
options.add_argument("--disable-blink-features=AutomationControlled")
b = webdriver.Chrome( options=options)


def temp_mail():
    b.get('https://temp-mail.org/en/')
    global email
    # time.sleep(6)
    # print('email found')
    
    email = b.find_element(by='xpath', value='/html/body/div[1]/div/div/div[2]/div[1]/form/div[1]/div/input').get_attribute('value')
    while(email == 'Loading' or email == 'Loading.' or email == 'Loading..' or email == 'Loading...'):
        email = b.find_element(by='xpath', value='/html/body/div[1]/div/div/div[2]/div[1]/form/div[1]/div/input').get_attribute('value')

    
    # email = b.find_element_by_xpath('/html/body/div[1]/div/div/div[2]/div[1]/form/div[1]/div/input').get_attribute('value')
    print(email)
    # print(pas)
    b.execute_script("window.open('about:blank','secondtab');")
    b.switch_to.window("secondtab")
    # b.get('https://www.zomato.com/')

    # time.sleep(6)



def token_view():
    b.get("https://services.tokenview.io/en/login")
    try:
        # Wait for the sign-up button to be clickable
        # sign_up = WebDriverWait(b, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#__layout > div > div > div.page > div.content > div.tips > span'))).click()
        time.sleep(2)
        b.find_element(By.XPATH,'//*[@id="__layout"]/div/div/div[2]/div[1]/div[2]/span').click()
        # #__layout > div > div > div.page > div.content > div.tips > span
        # b.execute_script("arguments[0].scrollIntoView(true);", sign_up)
        # sign_up.click()
        # sign_up.click()
        time.sleep(2)
        e = WebDriverWait(b, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, '#__layout > div > div > div.page > div.content > div.box > section > div.input_box > input')))
        e.send_keys(email)


        verifybtn = WebDriverWait(b, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, '#__layout > div > div > div.page > div.content > div.box > section > div.input_box > div')))
        verifybtn.click()

        # switch to email tab to get verification code

        # #__layout > div > div > div.page > div.content > div.box > section > div.input_box > input

        # #__layout > div > div > div.page > div.content > div.box > section > div.input_box > div

        # # __layout > div > div > div.page > div.content > div.box > section > input:nth-child(2)

        # #__layout > div > div > div.page > div.content > div.box > button
    except Exception as e:

        print(e)

    # time.sleep(100)

def getVer():
    # switch to email tab to get verification code
    b.switch_to.window(b.window_handles[0])
    time.sleep(6)
    # b.find_element_by_xpath('//*[@id="click-to-refresh"]').click()
    b.find_element(By.XPATH, '//*[@id="click-to-refresh"]').click()
    time.sleep(2)
    # b.refresh()
    time.sleep(100)

def email2():
    b.get('https://www.temporary-mail.net/')
    time.sleep(3)
    global email
    email = b.find_element(By.XPATH, '//*[@id="active-mail"]').get_attribute('value')
    # print(email)
    # time.sleep(100)
    b.execute_script("window.open('about:blank','secondtab');")
    b.switch_to.window("secondtab")

def email2_ver():
    b.switch_to.window(b.window_handles[0])
    time.sleep(6)
    b.refresh()

    # partial link text: 一封来自Tokenview的注册邮件 Register in Tokenview
    WebDriverWait(b, 10).until(EC.presence_of_element_located((By.PARTIAL_LINK_TEXT, '一封来自Tokenview的注册邮件 Register in Tokenview'))).click()

    # b.find_element(By.PARTIAL_LINK_TEXT, '一封来自Tokenview的注册邮件 Register in Tokenview').click()

    global code
    # //*[@id="main"]/div/div/div[2]/div[1]/div/div[3]/p[1]/strong
    time.sleep(4)
    code = b.find_element(By.XPATH, '//*[@id="main"]/div/div/div[2]/div[1]/div/div[3]/p[1]/strong').text

    # print(code)
    # time.sleep(100)
    # get email otp

def tkv():
    b.switch_to.window(b.window_handles[1])
    # enter code in tokenview

     # # __layout > div > div > div.page > div.content > div.box > section > input:nth-child(2)

        # #__layout > div > div > div.page > div.content > div.box > button
    code_input = b.find_element(By.CSS_SELECTOR, '#__layout > div > div > div.page > div.content > div.box > section > input:nth-child(2)')
    code_input.send_keys(code)
    

    # //*[@id="__layout"]/div/div/div[2]/div[1]/div[1]/div[2]/label/span[1]/span
    checkbox = b.find_element(By.XPATH, '//*[@id="__layout"]/div/div/div[2]/div[1]/div[1]/div[2]/label/span[1]/span')
    checkbox.click()
    # click on sign up
    time.sleep(1)
    signup = b.find_element(By.CSS_SELECTOR, '#__layout > div > div > div.page > div.content > div.box > button')
    signup.click()

    # //*[@id="__layout"]/div/div/div[2]/div[1]/div/section/input[1]
    # //*[@id="__layout"]/div/div/div[2]/div[1]/div/section/input[2]
    time.sleep(2)
    # enter password
    password = b.find_element(By.XPATH, '//*[@id="__layout"]/div/div/div[2]/div[1]/div/section/input[1]')
    password.send_keys('TestUser69')
    # confirm password
    confirm_password = b.find_element(By.XPATH, '//*[@id="__layout"]/div/div/div[2]/div[1]/div/section/input[2]')
    confirm_password.send_keys('TestUser69')
    # click on sign up
    time.sleep(1)
    signup = b.find_element(By.XPATH, '//*[@id="__layout"]/div/div/div[2]/div[1]/div/button')
    signup.click()
    # //*[@id="__layout"]/div/div/div[2]/div[1]/div/button

    # //*[@id="__layout"]/div/div/div[2]/div[1]/div[1]/div[2]/label/span[1]/input
    # eye
    # //*[@id="__layout"]/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/section[1]/div[1]/div[2]/img

    # key
    # //*[@id="__layout"]/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/section[1]/div[1]/div[2]/span

    time.sleep(6)
    eye = b.find_element(By.XPATH, '//*[@id="__layout"]/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/section[1]/div[1]/div[2]/img')
    eye.click()

    time.sleep(2)
    key = b.find_element(By.XPATH, '//*[@id="__layout"]/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/section[1]/div[1]/div[2]/span')
    k = key.text
    print(f"API_KEY: {k}")

    # time.sleep(100)

# temp_mail()
# token_view()
# getVer()
# test()
print("Getting email...")
email2()
print(f"Email: {email}")
token_view()
print("Waiting for OTP...")
email2_ver()
print(f"OTP: {code}")
tkv()
print("Done")

# Getting email...
# Email: *****@temporary-mail.net
# Waiting for OTP...
# OTP: ********
# API_KEY: **************
# Done