getCovidWorld();
getCovidCountry();
getSelectCountry()

const btnSelect=document.getElementById("select_world");
//addEventListener: thêm sự kiện cho btnSelect và gọi hàm getCovidCountryId
btnSelect.addEventListener('click',getCovidCountryId);

function getCovidCountryId(e){
    //fetch:thường dùng để lấy API từ một link 
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/'+ e.target.value)
        .then(res => res.json())//lấy dữ liệu trả về kiểu Json

        //lấy dữ liệu từ Json trả về ở trên chuyền vào data
        .then(data => {
            let id=data.location.id;
            let code=data.location.country_code;
            let quocgia=data.location.country;
            let tinh=data.location.province;
            let danso=data.location.country_population;
            let capnhat=data.location.last_updated;
            let canhiem=data.location.latest.confirmed;
            let tuvong=data.location.latest.deaths;
            let hoiphuc=data.location.latest.recovered;

            if(data.location.province!=""){
                document.getElementById('quocgia').innerHTML=quocgia.toLocaleString('en') + '-' + tinh.toLocaleString('en');
                document.getElementById('title_world').innerText=quocgia.toLocaleString('en') + '-' + tinh.toLocaleString('en');
            }
            else{
                document.getElementById('quocgia').innerHTML=quocgia.toLocaleString('en');
                document.getElementById('title_world').innerText=quocgia.toLocaleString('en');
            }

            //toLocaleString: định dạng string theo kiểu tùy chỉnh, vd: en -> tiếng anh, có thể định dạng format cho số
            document.getElementById('id').innerHTML=id;
            document.getElementById('code').innerHTML=code.toLocaleString('en'); 
            document.getElementById('danso').innerHTML=danso.toLocaleString('en');
            document.getElementById('capnhat').innerHTML=capnhat.substring(0,10);//substring: cắt ký tự
            document.getElementById('canhiem').innerHTML=canhiem.toLocaleString('en');
            document.getElementById('tuvong').innerHTML=tuvong.toLocaleString('en');
            document.getElementById('hoiphuc').innerHTML=hoiphuc.toLocaleString('en');
            //{minimumFractionDigits:2,maximumFractionDigits:2}: 
            //----------------->  minimumFractionDigits:2 -> lấy tối thiểu 2 số sau dấu ,
            //----------------->  maximumFractionDigits:2 -> lấy tối đa 2 số sau dấu ,
            document.getElementById('phantram').innerHTML=(Number(tuvong)/Number(canhiem)*100).toLocaleString('en',{minimumFractionDigits:2,maximumFractionDigits:2})+"%";
        })
        .catch(error=>console.log('Error'))
}

function getCovidCountry(){
    //fetch:thường dùng để lấy API từ một link 
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/278')
        .then(res => res.json())//lấy dữ liệu trả về kiểu Json

        //lấy dữ liệu từ Json trả về ở trên chuyền vào data
        .then(data => {
            let id=data.location.id;
            let code=data.location.country_code;
            let quocgia=data.location.country;
            let tinh=data.location.province;
            let danso=data.location.country_population;
            let capnhat=data.location.last_updated;
            let canhiem=data.location.latest.confirmed;
            let tuvong=data.location.latest.deaths;
            let hoiphuc=data.location.latest.recovered;

            if(data.location.province!=""){
                document.getElementById('quocgia').innerHTML=quocgia.toLocaleString('en') + '-' + tinh.toLocaleString('en');
                document.getElementById('title_world').innerText=quocgia.toLocaleString('en') + '-' + tinh.toLocaleString('en');
            }
            else{
                document.getElementById('quocgia').innerHTML=quocgia.toLocaleString('en');
                document.getElementById('title_world').innerText=quocgia.toLocaleString('en');
            }

            //toLocaleString: định dạng string theo kiểu tùy chỉnh, vd: en -> tiếng anh, có thể định dạng format cho số
            document.getElementById('id').innerHTML=id;
            document.getElementById('code').innerHTML=code.toLocaleString('en'); 
            document.getElementById('danso').innerHTML=danso.toLocaleString('en');
            document.getElementById('capnhat').innerHTML=capnhat.substring(0,10);//substring: cắt ký tự
            document.getElementById('canhiem').innerHTML=canhiem.toLocaleString('en');
            document.getElementById('tuvong').innerHTML=tuvong.toLocaleString('en');
            document.getElementById('hoiphuc').innerHTML=hoiphuc.toLocaleString('en');
            //{minimumFractionDigits:2,maximumFractionDigits:2}: 
            //----------------->  minimumFractionDigits:2 -> lấy tối thiểu 2 số sau dấu ,
            //----------------->  maximumFractionDigits:2 -> lấy tối đa 2 số sau dấu ,
            document.getElementById('phantram').innerHTML=(Number(tuvong)/Number(canhiem)*100).toLocaleString('en',{minimumFractionDigits:2,maximumFractionDigits:2})+"%";
        })
        .catch(error=>console.log('Error'))

}

function getCovidWorld(){
    //fetch:thường dùng để lấy API từ một link 
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
        .then(res => res.json())//lấy dữ liệu trả về kiểu Json

        //lấy dữ liệu từ Json trả về ở trên chuyền vào data
        .then(data => {
            console.log(data)
            const tong_canhiem=data.latest.confirmed;
            const tong_tuvong=data.latest.deaths;
            const tong_phuchoi=data.latest.recovered;

            document.getElementById("tong_canhiem").innerHTML=Intl.NumberFormat().format(tong_canhiem);
            document.getElementById("tong_tuvong").innerHTML=Intl.NumberFormat().format(tong_tuvong);
            document.getElementById("tong_phuchoi").innerHTML=Intl.NumberFormat().format(tong_phuchoi);

            //map: vòng lặp 
            //biến covid lấy tất cả dữ liệu từ mảng  locations
            const html=data.locations.map(covid =>{

                const id=covid.id;
                const code=covid.country_code;
                const quocgia=covid.country;
                const tinh=covid.province;
                const danso=covid.country_population;
                const capnhat=covid.last_updated;
                const canhiem=covid.latest.confirmed;
                const tuvong=covid.latest.deaths;
                const hoiphuc=covid.latest.recovered;

                // `` để nối HTML 
                return `
                <ul class="list_world">
                    <li>
                        <p>id:${id}</p>
                        <p>Quốc gia: ${quocgia.toLocaleString('en')}</p>
                        <p>Tỉnh: ${tinh.toLocaleString('en')}</p>
                        <p>Mã Quốc gia: ${code.toLocaleString('en')}</p>
                        <p>Dân số: ${new Intl.NumberFormat().format(danso)}</p>
                        <p>Cập nhật: ${capnhat.substring(0,10)}</p>
                        <p>Ca nhiễm: ${new Intl.NumberFormat().format(canhiem)}</p>
                        <p>Tử vong: ${new Intl.NumberFormat().format(tuvong)}</p>
                        <p>Hồi phục: ${hoiphuc.toLocaleString('en')}</p>
                        <p>Phần trăm: ${(Number(tuvong)/Number(canhiem)*100).toLocaleString('en',{minimumFractionDigits:2,maximumFractionDigits:2})+"%"}</p>
                    </li>
                </ul>
                `
            }).join("");//trả về 1 mảng -----> join: nối mảng thành chuỗi
            
            //insertAdjacentHTML: thêm nội dung vào trang 
            //-----> nhận 2 tham số: 
            //-----------> tham số 1: vị trí
            //-----------> tham số 2: nội dung cần thêm
            document.getElementById("list").insertAdjacentHTML("afterbegin",html);
           
        })
        .catch(error=>console.log('Error'))
}

function getSelectCountry(){
    //fetch:thường dùng để lấy API từ một link 
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
        .then(res => res.json())//lấy dữ liệu trả về kiểu Json

        //lấy dữ liệu từ Json trả về ở trên chuyền vào data
        .then(data => {
            //map: vòng lặp 
            //biến covid lấy tất cả dữ liệu từ mảng  locations
            const html=data.locations.map(list =>{

                const id=list.id;
                const quocgia=list.country;

                //tạo Element tên option
                var option=document.createElement('option');
                option.value=id;//gắn giá trị cho value của option
                if(list.province!=""){
                    option.innerHTML=quocgia +'-'+ list.province;
                }
                else{
                    option.innerHTML=quocgia;
                }

                //appendChild(option): chèn các option vào id=select_world
                document.getElementById("select_world").appendChild(option);
            })
            
            
        })
        .catch(error=>console.log('Error'))
}