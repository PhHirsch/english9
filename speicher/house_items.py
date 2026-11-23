"""Haus-Katalog: frei kombinierbare Teile. Felder: id, slot, name, price, lvl, months, unit, stars (Sterne-Bedingung), kind, color."""
import json
H = []
def add(id, slot, name, price=0, **kw): H.append(dict(id=id, slot=slot, name=name, price=price, **kw))

# Untergrund
add("g-grass", "ground", "Green grass", kind="grass", color="#79b955")
add("g-meadow", "ground", "Flower meadow", 80, kind="meadow", color="#86c25e")
add("g-weser", "ground", "Weser riverside", 150, kind="weser", color="#73b052")
add("g-beach", "ground", "Beach", 200, kind="beach", color="#ecd79a")
add("g-snow", "ground", "Snow", 120, kind="snow", color="#f4f8fc", months=[12, 1, 2])
add("g-autumn", "ground", "Autumn leaves", 100, kind="autumn", color="#b8913f", months=[10, 11])
add("g-desert", "ground", "Desert", 180, kind="desert", color="#e2bd78")
add("g-moon", "ground", "Moon surface 🌙", 700, lvl=5, kind="moon", color="#b9bcc6")
add("g-candy", "ground", "Candy land 🍭", 800, lvl=6, kind="candy", color="#f7a8cf")
add("g-lava", "ground", "Lava island 🌋", 1200, lvl=8, stars=40, kind="lava", color="#3a2a2a")

# Wände (Material) – Farbe kommt aus „wcolor“
add("w-plaster", "wall", "Plaster", kind="plaster")
add("w-wood", "wall", "Wooden boards", 80, kind="wood")
add("w-brick", "wall", "Bricks", 120, kind="brick")
add("w-timber", "wall", "Half-timbered (like in Höxter)", 200, kind="timber")
add("w-log", "wall", "Log cabin", 220, kind="log")
add("w-stone", "wall", "Stone", 250, kind="stone")
add("w-glass", "wall", "Glass (modern)", 400, lvl=4, kind="glass")
add("w-rainbow", "wall", "Rainbow stripes 🌈", 600, lvl=5, kind="rainbow")
add("w-gold", "wall", "Gold 👑", 1500, lvl=9, stars=50, kind="gold")

# Wandfarben
for i, (k, n, c, p) in enumerate([("cream", "Cream", "#efe3c8", 0), ("white", "White", "#f4f4f2", 30), ("sky", "Sky blue", "#a9cdea", 40),
                                   ("mint", "Mint", "#b5e0c4", 40), ("rose", "Rose", "#f2b8c6", 40), ("sun", "Sunny yellow", "#f5d36b", 40),
                                   ("peach", "Peach", "#f4b98e", 40), ("lilac", "Lilac", "#c7b4e6", 50), ("grey", "Stone grey", "#a9adb3", 40),
                                   ("red", "Barn red", "#b5453a", 60), ("navy", "Navy", "#3b4f7a", 60), ("black", "Black", "#34363b", 80), ("neon", "Neon green ⚡", "#7cff4f", 300)]):
    add(f"wc-{k}", "wcolor", n, p, color=c)

# Dächer
add("r-gable", "roof", "Gable roof", kind="gable")
add("r-hip", "roof", "Hip roof", 100, kind="hip")
add("r-flat", "roof", "Flat roof", 100, kind="flat")
add("r-green", "roof", "Green roof (garden on top)", 250, kind="green")
add("r-thatch", "roof", "Thatched roof", 250, kind="thatch")
add("r-pagoda", "roof", "Pagoda roof", 400, lvl=4, kind="pagoda")

# Dachfarben
for k, n, c, p in [("red", "Tile red", "#b8442f", 0), ("brown", "Brown", "#7a4a2c", 30), ("slate", "Slate", "#4a5260", 40), ("green", "Green", "#3f7a45", 50),
                   ("blue", "Blue", "#2f5d9a", 50), ("black", "Black", "#2a2a2e", 50), ("purple", "Purple", "#6a3fa0", 80), ("pink", "Pink", "#e0679a", 100), ("gold", "Gold ✨", "#e2b23a", 600)]:
    add(f"rc-{k}", "rcolor", n, p, color=c)

# Fenster
add("win-classic", "window", "Classic windows", kind="classic")
add("win-shutter", "window", "Windows with shutters", 80, kind="shutter")
add("win-round", "window", "Round windows", 100, kind="round")
add("win-arch", "window", "Arched windows", 120, kind="arch")
add("win-wide", "window", "Panorama windows", 150, kind="wide")
add("win-stained", "window", "Stained glass", 300, lvl=3, kind="stained")
add("win-heart", "window", "Heart windows 💖", 400, lvl=4, kind="heart")

# Türen
add("d-wood", "door", "Wooden door", kind="door", color="#6b4226")
add("d-red", "door", "Red door", 50, kind="door", color="#c0392b")
add("d-blue", "door", "Blue door", 50, kind="door", color="#2f5d9a")
add("d-arch", "door", "Arched door", 120, kind="arch", color="#5a3a1a")
add("d-glass", "door", "Glass door", 150, kind="glass", color="#3a3f48")
add("d-castle", "door", "Castle gate", 350, lvl=4, kind="castle", color="#4a3220")
add("d-space", "door", "Spaceship hatch 🚀", 600, lvl=6, kind="space", color="#9aa4b4")

# Dach-Extras
add("rx-none", "roofx", "Nothing")
add("rx-chimney", "roofx", "Chimney with smoke", 80, kind="chimney")
add("rx-solar", "roofx", "Solar panels", 150, kind="solar")
add("rx-dish", "roofx", "Satellite dish", 120, kind="dish")
add("rx-flag", "roofx", "Flag", 100, kind="flag")
add("rx-rooster", "roofx", "Weather rooster", 120, kind="rooster")
add("rx-turbine", "roofx", "Wind turbine", 250, kind="turbine")
add("rx-lights", "roofx", "Christmas lights 🎄", 150, kind="lights", months=[12, 1])
add("rx-telescope", "roofx", "Telescope", 400, lvl=5, kind="telescope")
add("rx-heli", "roofx", "Helicopter pad 🚁", 900, lvl=7, stars=35, kind="heli")

# Zaun
add("f-none", "fence", "No fence")
add("f-picket", "fence", "White picket fence", 80, kind="picket", color="#f4f4f2")
add("f-wood", "fence", "Wooden fence", 80, kind="picket", color="#8a5a32")
add("f-hedge", "fence", "Hedge", 120, kind="hedge", color="#3f8a3a")
add("f-stone", "fence", "Stone wall", 180, kind="stone", color="#a9a49a")
add("f-lights", "fence", "Fairy lights ✨", 200, kind="lights", color="#7a5a32", months=[11, 12, 1])

# Garten (gleiche Liste für alle Garten-Plätze)
add("y-none", "yard", "Empty")
add("y-tree", "yard", "Oak tree", 60, kind="tree")
add("y-pine", "yard", "Pine tree", 60, kind="pine")
add("y-apple", "yard", "Apple tree", 90, kind="apple")
add("y-flowers", "yard", "Flower bed", 70, kind="flowers")
add("y-veg", "yard", "Vegetable patch", 90, kind="veg")
add("y-bench", "yard", "Garden bench", 80, kind="bench")
add("y-bbq", "yard", "Barbecue", 120, kind="bbq")
add("y-doghouse", "yard", "Doghouse", 150, kind="doghouse")
add("y-gnomes", "yard", "Garden gnomes", 150, kind="gnomes")
add("y-trampoline", "yard", "Trampoline", 200, kind="trampoline")
add("y-swing", "yard", "Swing set", 200, kind="swing")
add("y-pond", "yard", "Pond with ducks", 220, kind="pond")
add("y-car", "yard", "Family car", 300, kind="car")
add("y-pool", "yard", "Swimming pool", 400, stars=15, kind="pool")
add("y-boat", "yard", "Weser boat", 350, kind="boat")
add("y-corvey", "yard", "Mini Corvey (Höxter)", 500, stars=20, kind="corvey")
add("y-fountain", "yard", "Fountain", 450, lvl=4, kind="fountain")
add("y-xmas", "yard", "Christmas tree 🎄", 150, kind="xmas", months=[12, 1])
add("y-snowman", "yard", "Snowman ⛄", 100, kind="snowman", months=[12, 1, 2])
add("y-pumpkins", "yard", "Pumpkins 🎃", 100, kind="pumpkins", months=[10, 11])
add("y-eggs", "yard", "Easter eggs 🐣", 100, kind="eggs", months=[3, 4])
add("y-dino", "yard", "Dinosaur statue 🦖", 700, lvl=6, kind="dino")
add("y-ufo", "yard", "Landed UFO 🛸", 1000, lvl=7, kind="ufo")
add("y-rocket", "yard", "Rocket 🚀", 1500, lvl=9, stars=50, kind="rocket")
# Unit-Teile (erscheinen erst, wenn die Unit freigeschaltet ist)
# Unit-Teile Orange Line 5
add("y-kangaroo", "yard", "Kangaroo (Australia)", 350, unit=1, kind="kangaroo")
add("y-reef", "yard", "Mini coral reef", 400, unit=1, kind="reef")
add("y-hammock", "yard", "Palm trees with hammock", 350, unit=2, kind="hammock")
add("y-steelpan", "yard", "Steelpan", 300, unit=2, kind="steelpan")
add("y-chest", "yard", "Pirate treasure chest", 450, unit=2, kind="chest")
add("y-jeep", "yard", "Safari jeep", 450, unit=3, kind="jeep")
add("y-rhino", "yard", "Rhino", 400, unit=3, kind="rhino")
add("y-junk", "yard", "Junk boat (Hong Kong)", 450, unit=4, kind="junk")
add("y-dimsum", "yard", "Dim sum stall", 350, unit=4, kind="dimsum")
add("y-lanterns", "yard", "Red lanterns", 250, unit=4, kind="lanterns")

# add("y-taxi", "yard", "Yellow cab (New York)", 300, unit=1, kind="taxi")  # english8 (OL4)
# add("y-liberty", "yard", "Mini Statue of Liberty", 400, unit=1, kind="liberty")  # english8 (OL4)
# add("y-schoolbus", "yard", "School bus", 350, unit=2, kind="schoolbus")  # english8 (OL4)
# add("y-amish", "yard", "Amish barn with buggy", 400, unit=3, kind="amish")  # english8 (OL4)
# add("y-ggbridge", "yard", "Mini Golden Gate Bridge", 500, unit=4, kind="ggbridge")  # english8 (OL4)
# add("y-walkstar", "yard", "Walk of Fame star", 300, unit=4, kind="walkstar")  # english8 (OL4)
# add("y-robot", "yard", "Silicon Valley robot", 450, unit=4, kind="robot")  # english8 (OL4)
# add("y-nascar", "yard", "NASCAR race car", 500, unit=5, kind="nascar")  # english8 (OL4)

HSLOTS = ["ground", "wall", "wcolor", "roof", "rcolor", "window", "door", "roofx", "fence", "yard1", "yard2", "yard3", "yard4"]
HDEFAULT = {"ground": "g-grass", "wall": "w-plaster", "wcolor": "wc-cream", "roof": "r-gable", "rcolor": "rc-red", "window": "win-classic",
            "door": "d-wood", "roofx": "rx-none", "fence": "f-none", "yard1": "y-none", "yard2": "y-none", "yard3": "y-none", "yard4": "y-none"}
STAGES = [0, 5, 12, 20, 30, 45, 65]          # Sterne für Zelt, Hütte, Häuschen, Haus, großes Haus, Villa, Anwesen
YARD_STAGE = {"yard1": 1, "yard2": 2, "yard3": 4, "yard4": 5}

if __name__ == "__main__":
    ids = [h["id"] for h in H]; assert len(ids) == len(set(ids))
    print(len(H), "Hausteile")
