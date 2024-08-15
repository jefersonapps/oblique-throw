import math

g = 9.81

def degreeToRad(degree):
    return (degree * math.pi)/180

def alcance(v, theta):
    r = (v**2*math.sin(2*(theta)))/g
    return r

data = [
    # {"v": 15, "theta": 10}, 
    #     {"v": 17, "theta": 12}, 
    #     {"v": 19, "theta": 14}, 
    #     {"v": 21, "theta": 16}, 
    #     {"v":23, "theta": 18},
    #     {"v":25, "theta": 20},
    #     {"v":27, "theta": 22},
    #     {"v":29, "theta": 24},
    #     {"v":31, "theta": 26},
    #     {"v":33, "theta": 28},
    #     {"v": 20, "theta": 50},
    #     {"v": 30, "theta": 70},
    #     {"v": 50, "theta": 80},
        {"v": 20, "theta": 10}, 
        {"v": 20, "theta": 20}, 
        {"v": 20, "theta": 30}, 
         {"v": 20, "theta": 40}, 
         {"v": 20, "theta": 50}, 
         {"v": 20, "theta": 60},
         {"v": 20, "theta": 70}, 
         {"v": 20, "theta": 80}, 
         {"v": 20, "theta": 90},
         {"v": 20, "theta": 45},
         {"v": 20, "theta": 30},
        ]

for values in data:
    print(f' theta={values["theta"]}, v={values["v"]}, alcance = {alcance(values["v"], values["theta"])}')