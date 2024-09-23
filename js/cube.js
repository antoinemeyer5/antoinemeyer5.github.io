import * as THREE from 'three';

class Cube extends THREE.Mesh {
    constructor(geometry, color, link) {
        super()
        this.geometry = geometry
        this.material = new THREE.MeshBasicMaterial({ color: color })
        this.cubeSize = 1
        this.cubeActive = false
        if (link != null) {
            this.link = link;
            this.cubeActive = true
        } else {
            this.cubeActive = false
        }
    }

    // render() { this.rotation.y = this.rotation.y += 0.01 }

    onPointerOver(e) {
        if (this.cubeActive) {
            document.getElementsByTagName("body")[0].style.cursor = "url('http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur'), auto";
        }
    }

    onPointerOut(e) {
        if (this.cubeActive) {
            document.body.style.cursor = null;
        }
    }

    onClick(e) {
        if (this.cubeActive) {
            document.location.href = this.link;
        }
        /*this.cubeActive = !this.cubeActive
        this.scale.setScalar(this.cubeSize * (this.cubeActive ? 1.5 : 1))
        //window.history.pushState('page2', 'Title', link);
        document.location.href = this.link;*/
    }
}

export { Cube };
