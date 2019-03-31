export default class ListModel {
    guid_id;
    date;

    constructor(
        guid_id = '',
        date = '',
    ) {
        this.guid_id = guid_id;
        this.date = date;
    }
}