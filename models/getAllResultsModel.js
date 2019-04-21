export default class GetAllResultsModel {
    user_id;
    count;

    constructor(
        user_id = 0,
        count = 0
    ) {
        this.user_id = user_id;
        this.count = count;
    }
}
