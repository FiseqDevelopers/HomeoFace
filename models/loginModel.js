export default class LoginModel {
    email;
    password;
    isActive;
    appBuild;
    appVersion;
    deviceName;
    id;
    idiom;
    isDevice;
    manufacturer;
    model;
    platform;
    version;

    constructor(
        email = '',
        password = '',
        isActive = false,
        appBuild = '',
        appVersion = '',
        deviceName = '',
        id = '',
        idiom = '',
        isDevice = false,
        manufacturer = '',
        model = '',
        platform = '',
        version = '',
    ) {
        this.email = email;
        this.password = password;
        this.isActive = isActive;
        this.appBuild = appBuild;
        this.appVersion = appVersion;
        this.deviceName = deviceName;
        this.id = id;
        this.idiom = idiom;
        this.isDevice = isDevice;
        this.manufacturer = manufacturer;
        this.model = model;
        this.platform = platform;
        this.version = version;
    }
}