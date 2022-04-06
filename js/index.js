// use https (http secure).
// http (non secure) will make the app complain about mixed content when running the app from Azure
const baseUrl = "https://pairprogrammingrecords.azurewebsites.net/api/Records"

Vue.createApp({
    data() {
        return {
            Records: [],
            TitleToGetBy: "",
            idToGetBy: -1,
            singleRecords: null,
            deleteId: 0,
            deleteMessage: "",
            addData: { artistName: "", Title: ""},
            addMessage: "",
            updateData: { id: 0, artistName: "", Title: ""},
            updateMessage: ""
        }
    },
    methods: {
        getAllRecords() {
            this.helperGetAndShow(baseUrl)
        },
        getByTitle(Title) {
            const url = baseUrl + "?Title=" + Title
            this.helperGetAndShow(url)
        },
        async helperGetAndShow(url) { // helper metode: getAllRecords + getByTitle are very similar
            try {
                const response = await axios.get(url)
                this.Records = await response.data
            } catch (ex) {
                alert(ex.message) // https://www.w3schools.com/js/js_popup.asp
            }
        },
        async getById(id) {
            const url = baseUrl + "/id/" + id
            try {
                const response = await axios.get(url)
                this.singleRecords = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async deleteRecords(deleteId) {
            const url = baseUrl + "/" + deleteId
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllRecords()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async addRecords() {
            try {
                response = await axios.post(baseUrl, this.addData)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllRecords()
            } catch (ex) {
                alert(ex.message)
            }
        },
        // async updateRecords() {
        //     const url = baseUrl + "/" + this.updateData.id
        //     try {
        //         response = await axios.put(url, this.updateData)
        //         this.updateMessage = "response " + response.status + " " + response.statusText
        //         this.getAllRecords()
        //     } catch (ex) {
        //         alert(ex.message)
        //     }
        // }
    }
}).mount("#app")