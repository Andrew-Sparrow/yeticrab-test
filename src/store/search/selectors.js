import {NameSpace} from '../root-reducer';

export const getSearchResults = (state) => state[NameSpace.SEARCH].searchResults;
export const getSearchTerm = (state) => state[NameSpace.SEARCH].searchTerm;
