export default class GetAllResultsModel {
    user_id;
    guid_id;

    constructor(
        user_id = 0,
        guid_id = ''
    ) {
        this.user_id = user_id;
        this.guid_id = guid_id;
    }
}