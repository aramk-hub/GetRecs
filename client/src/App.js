import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import {useState, useEffect} from 'react';


const APIController = (function() {
		const clientId = '';
		const clientSecret = '';

		const _getToken = async () => {
				const result = await fetch('https://accounts.spotify.com/api/token' , {
						method: 'POST',
						headers: {
								'Content Type' : 'application/x-www-form-urlencoded' ,
								'Authorization' : 'Basic' + btoa(clientId + ':' + clientSecret)
						},
						body: 'grant_type=client_credentials'
				});
				const data = await result.json();
				return data.access_token;
		}


		const _getGenres = async(token) => {
				const result = await fetch(`https://api.spotify.com/v1/recommendations/available-genre-seeds` , {
						method: 'GET', 
						headers: {'Authorization' : 'Bearer' + token}
				});

				const data = await result.json();
				return data.genres.items;
		}

		const _getRecs = async(token, genreId) => {

				const result = await fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${genreId}` , {
						method: 'GET' , 
						headers: {'Authorization' : 'Bearer' + token}
				});
				
				const data = await result.json();
				return data.tracks.items;
		}

		return {
				getToken() {
					return _getToken();
				},
				getGenres(token) {
					return _getGenres();
				},
				getRecs(token, genreId) {
					return _getRecs(token, genreId)
				}
		}

})();




function App() {
	const [searchInput, setSearchInput] = useState("");
	return (
		<div className="App">
			
		</div>
	);
}

export default App;
