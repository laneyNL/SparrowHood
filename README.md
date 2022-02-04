# [Sparrowhood](https://sparrowhood.herokuapp.com/#/)

 
 
[Sparrowhood](https://sparrowhood.herokuapp.com/#/) is a clone of Robinhood. It allows users to sell, purchase, and monitor stocks. Charts display an user's portfolio performance and individual stock performances over user designated time intervals. Data for each individual stock's is obtained from a real-time database(API). Watchlists maybe be created and updated to monitor stocks with tables.

 
 
 ## Technologies Used
   * Frontend:
     * React
     * HTML/CSS
   * Backend: 
     * Ruby
     * Javascript
     * AJAX
     * JBuilder
     * Rails
     * Redux
     * PostgreSQL
   
## Features
  * User creation and login
    * ![login](https://user-images.githubusercontent.com/82133627/152612668-a1c90e8c-9e1f-4efa-a35c-600775e81766.gif)
  * Portoflio chart performance over time with sidebar of all owned stocks
    * ![portfolio_graph](https://user-images.githubusercontent.com/82133627/152612672-c3607815-2d08-4d5a-aed3-d2de92852ca0.gif)
  * Stock chart displaying real time stock prices from a API
    * ![SparrowhoodGraph](https://user-images.githubusercontent.com/82133627/152574195-76429be6-d24b-42f6-8a46-813d00c3faeb.gif)
  * Purchase and sell stock in shares or dollars
    * ![buy sell](https://user-images.githubusercontent.com/82133627/152612666-f19694b6-6fdd-48aa-92ae-8472b438c5f2.gif)
  * Add stocks to watchlists
    * ![add_asset](https://user-images.githubusercontent.com/82133627/152613031-2c5d90fe-4068-4c62-8563-2b1557c1f5a4.gif)
  * Sort watchlist table by any table column
    * ![SparrowhoodTable](https://user-images.githubusercontent.com/82133627/152574206-579f1390-811d-46bd-a027-1599cda9ad58.gif)
  * Search bar with stock symbols and names from API
    * ![search](https://user-images.githubusercontent.com/82133627/152612673-4db83667-310b-466b-b70f-4324ddb3b591.gif)
 
## Code Highlights
  * All stock data was return by the API call in a javascript object so could not be kept sorted in a specfic order. By creating an array of stock symbols, the data could now be sorted based on different columns. The quick sort algorithm and a custom sorting callback were used to efficiently sort the array.
    * ![sort](https://user-images.githubusercontent.com/82133627/152614031-75673645-b59f-4636-bf65-482f09dd296a.png)
  * Originaly each change to the search bar would fire off an API call. With the limit of 5 API calls per minute, this limit was quickly exceed. A debounce function was added to reduce API pulls. With the debounce function, the call to the API only occurs if the user stops typing for 1 second.
    * ![debounce](https://user-images.githubusercontent.com/82133627/152614028-2743dcbe-69bf-41ee-aac2-6d0bfea18cb4.png)

 
 ## Upcoming Features
   * Display featured news on the homepage
   * Add filters for watchlist table data







