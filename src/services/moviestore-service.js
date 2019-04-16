export default class MoviestoreService {

    getResource = async (url) => {
        const res = await fetch(url);
        return await res.json();
    }
    
    getImagePath = async () => {
        const base = await this.getResource('https://api.themoviedb.org/3/configuration?api_key=dab311d55ca033353e291532b0572824');
        const size = await this.getResource('https://api.themoviedb.org/3/configuration?api_key=dab311d55ca033353e291532b0572824');
    
        const part1 = base.images.secure_base_url;
        const part2 = size.images.poster_sizes[4];
            
        const imagePath = `${part1}${part2}`;
        return imagePath;
    }

    getImagePathExtended = async (id) => {
        const poster = await this.getResource(`https://api.themoviedb.org/3/movie/${id}?api_key=dab311d55ca033353e291532b0572824&language=en-US`);
        const base = await this.getResource('https://api.themoviedb.org/3/configuration?api_key=dab311d55ca033353e291532b0572824');
        const size = await this.getResource('https://api.themoviedb.org/3/configuration?api_key=dab311d55ca033353e291532b0572824');
    
        const part1 = base.images.secure_base_url;
        const part2 = size.images.poster_sizes[4];
        const part3 = poster.poster_path;
            
        const imagePath = `${part1}${part2}${part3}`;
        return imagePath;
    }

    
    getItemList = async () => {
        const list = await this.getResource('https://api.themoviedb.org/4/list/222?page=1&api_key=dab311d55ca033353e291532b0572824');
        return list.results.map(this._tranformItem);
    }

    getItem = async (id) => {
        const item = await this.getResource(`https://api.themoviedb.org/3/movie/${id}?api_key=dab311d55ca033353e291532b0572824&language=en-US`);
        return this._tranformItem(item);
    }

    _tranformItem = (movie) => {
        return  {
            id: movie.id,
            overview: movie.overview,
            title: movie.original_title,
            release: movie.release_date,
            path: movie.poster_path
        }  
    } 
}