export default class UserInfo {
    constructor({nameSelector, jobSelector, imageSelector}) {
        this._name = document.querySelector(nameSelector)
        this._job = document.querySelector(jobSelector)
        this._image = document.querySelector(imageSelector)
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent,
        }
    }

    setUserInfo(name, job, link) {
        this._name.textContent = name;
        this._job.textContent = job;
        this.setAvatar(link);
    }

    setAvatar(link) {
        this._image.src = link;
    }
}