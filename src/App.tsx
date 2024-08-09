import './App.css';
import PlaceDevider from './components/PlaceDevider';
import MainBanner from './pages/MainBanner';
import SearchBar from './pages/SearchBar';
import GenreSearch from './pages/GenreSearch';
import SearchList from './pages/SearchList';


function App() {

  
  return (
    <div className="App">
      
      <PlaceDevider/>
      <MainBanner/>               
      <GenreSearch/>
      <SearchBar/>
      <SearchList/>
      
      
    </div>    
  );
}

export default App;
