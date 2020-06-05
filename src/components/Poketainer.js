import React from 'react';
import PokeTable from './Poketable'
import Pokesearch from './Pokesearch';
import FilterCard from './FilterCard';
import PokeModal from './PokeModal';


class Poketainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ogList: null,
            searchTerm: '',
            filteredList: [],
            types: [],
            selectedTypes: [],
            weaknesses: [],
            selectedWeaknesses: [],
            show: false,
            selectedPokemon: null
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleTypeCheck = this.handleTypeCheck.bind(this);
        this.handleWeaknessCheck = this.handleWeaknessCheck.bind(this);
        this.filterResults = this.filterResults.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDetailsClick = this.handleDetailsClick.bind(this);
        this.updateSelectedPokemon = this.updateSelectedPokemon.bind(this);
    }

    // Finds unique types among all pokemon
    parseTypes(pokemonArray){
        const typeArray = [];
        pokemonArray.forEach((pokemon) => {
            pokemon.type.forEach((type) => {
                if(typeArray.indexOf(type) < 0) {
                    typeArray.push(type)
                }
            })
        })
        return typeArray;
    }

    // Finds unique weaknesses among all pokemon
    parseWeaknesses(pokemonArray){
        const typeArray = [];
        pokemonArray.forEach((pokemon) => {
            pokemon.weaknesses.forEach((weakness) => {
                if(typeArray.indexOf(weakness) < 0) {
                    typeArray.push(weakness)
                }
            })
        })
        return typeArray;
    }

    filterResults(searchTerm, selectedTypes, selectedWeaknesses){
        var filteredArray = []

        if(searchTerm === '') {
            filteredArray = this.state.ogList
        } else {
            const newList = this.state.ogList.filter((pokemon) => 
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            filteredArray = newList;
        }
        
        var filteredByTypeList = []
        filteredArray.forEach(pokemon => {
            var hasAllElements = selectedTypes.every(v => pokemon.type.includes(v));
            if(hasAllElements) {
                filteredByTypeList.push(pokemon);
            }
        })

        filteredArray = filteredByTypeList

        var filteredByWeaknessList = []
        filteredArray.forEach(pokemon => {
            var hasAllElements = selectedWeaknesses.every(v => pokemon.weaknesses.includes(v));
            if(hasAllElements) {
                filteredByWeaknessList.push(pokemon);
            }
        })

        filteredArray = filteredByWeaknessList

        this.setState({filteredList: filteredArray})
    }

    handleTypeCheck(event){
        var typeArray = this.state.selectedTypes;
        if(event.target.checked) {
            typeArray.push(event.target.value);
        } else {
            var index = typeArray.indexOf(event.target.value)
            typeArray.splice(index, 1);
        }
        this.setState({selectedTypes: typeArray}, this.filterResults(this.state.searchTerm, typeArray, this.state.selectedWeaknesses));
    }

    handleWeaknessCheck(event){
        var weaknessArray = this.state.selectedWeaknesses;
        if(event.target.checked) {
            weaknessArray.push(event.target.value);
        } else {
            var index = weaknessArray.indexOf(event.target.value)
            weaknessArray.splice(index, 1);
        }
        this.setState({selectedWeaknesses: weaknessArray}, this.filterResults(this.state.searchTerm, this.state.selectedTypes, weaknessArray));
    }

    handleSearchChange(event){
        const input = event.target.value;
        this.setState({searchTerm: input}, this.filterResults(input, this.state.selectedTypes, this.state.selectedWeaknesses));
    }

    handleDetailsClick(pokemon){
        this.setState({selectedPokemon: pokemon, show: true});
    }

    componentDidMount() {
        fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
            .then(response => response.json())
            .then(data => this.setState({ 
                ogList: data.pokemon, 
                filteredList: data.pokemon, 
                types: this.parseTypes(data.pokemon),
                weaknesses: this.parseWeaknesses(data.pokemon) 
            }));
    }

    handleClose(){
        this.setState({show: false});
    }

    handleShow(){
        this.setState({show: true});
    }

    updateSelectedPokemon(num){
        const newPokemon = this.state.ogList.find((pokemon) => pokemon.num === num);
        this.setState({selectedPokemon: newPokemon});
    }

    render() {
        return (
            <>
                <PokeModal showModal={this.state.show} handleClose={this.handleClose} updatePokemon={this.updateSelectedPokemon} pokemon={this.state.selectedPokemon}/>
                <Pokesearch handleSearchChange={this.handleSearchChange} />
                <FilterCard title={'Filter by Type'} items={this.state.types} handleCheck={this.handleTypeCheck}/>
                <FilterCard title={'Filter by Weakness'} items={this.state.weaknesses} handleCheck={this.handleWeaknessCheck}/>
                {this.state.filteredList && (
                    <PokeTable pokemon={this.state.filteredList} handleDetailsClick={this.handleDetailsClick}/>
                )}
            </>
        );
    }
}

export default Poketainer;