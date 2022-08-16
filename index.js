const { createApp, ref, onMounted} = Vue

const app = createApp({
    data() {
        return {
            showForm: false
        }
    },

    setup() {
        const film = ref({
            id: null,
            judul: "",
            sinopsis: "",
            genre: "",
            direktur: "",
            produser: "",
            negara: "",
            tahun: 0,
            list: [],
            isUpdate: false,
        });

        const url = "http://localhost:1007";

        const getData = async () => {
            const res = await axios.get(url+"/film");
            film.value.list = res.data;
        }

        const resetData = () => {
            film.value.judul = "";
            film.value.sinopsis = "";
            film.value.genre = "";
            film.value.direktur = "";
            film.value.produser = "";
            film.value.negara = "";
            film.value.tahun = 0;
            film.value.id = null;
            film.value.isUpdate = false;
        };

        const createData = async () => {
            await axios.post(url+"/film/create", 
            {
                judul: film.value.judul,
                sinopsis: film.value.sinopsis,
                genre: film.value.genre,
                direktur: film.value.direktur,
                produser: film.value.produser,
                negara: film.value.negara,
                tahun: parseInt(film.value.tahun),
            });

            await getData();
            resetData();
        };

        const updateData = async () => {
            await axios.put(url+"/film/update", 
            {
                id: film.value.id,
                judul: film.value.judul,
                sinopsis: film.value.sinopsis,
                genre: film.value.genre,
                direktur: film.value.direktur,
                produser: film.value.produser,
                negara: film.value.negara,
                tahun: parseInt(film.value.tahun),
            });

            await getData();
            resetData();
        };

        const setFilm = (item) => {
            film.value.isUpdate = true;
            film.value.id = item.id;
            film.value.judul = item.judul;
            film.value.sinopsis = item.sinopsis;
            film.value.genre = item.genre;
            film.value.direktur = item.direktur;
            film.value.produser = item.produser;
            film.value.negara = item.negara;
            film.value.tahun = item.tahun;
        };

        const deleteData = async (id) => {
            await axios.delete(url+"/film/delete", {
                data: {
                    id,
                },
            });

            await getData();
            resetData();
        };

        onMounted(async () => {
            await getData();
        });

        return {
            film,
            updateData,
            createData,
            deleteData,
            setFilm,
        };
    },
});

app.mount('#app');