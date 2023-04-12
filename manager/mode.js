const Mode = {
    Build: 0,
    Floor: 1,
    Camera: 2,
    

    title : function(mode) {
        switch (mode) {
            case this.Build:
                return "楼";
            case this.Floor:
                return "楼层";
            case this.Camera:
                return "摄像头";
        }
    }
}