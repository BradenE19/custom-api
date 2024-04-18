We used the MySql database for this project. In it, we have a table called 'gunstable' that lists the categories. Here is the code that creates the table as well as the categories inside it.

CREATE TABLE gunstable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gun_name VARCHAR(255),
    gun_img VARCHAR(255),
    type VARCHAR(255),
    size VARCHAR(255),
    colors VARCHAR(255),
    price VARCHAR(255),
    description TEXT,
    ammo VARCHAR(255),
    availability VARCHAR(255)
);

In order to get the proper info in the database, we needed to create a CSV file that lists each gun consistently. For example, here is the first 3 guns and how they are arranged.


,gun_name,gun_img,type,size,colors,price,description,ammo,availability

1,Rossberg Space Shotgun,Gun_Images\gun1.jpg,Shotgun,Medium,Black,4200 Space Dollars,"Can blast through anything…and anyone.",Buckshot,This product is available.

2,The Pluto Peashooter,Gun_Images\gun2.jpg,Pistol,Small,Blue,565 Space Dollars,"This slim little firearm can be hidden anywhere.",Laser Crystals,This product is available.

3,Rhimoon Cannon,Gun_Images\gun3.jpg,Pistol,Small,White,800 Space Dollars,"Small yet effiecient. Has a nasty kickback though.",Ice Crystals,This product is not available.