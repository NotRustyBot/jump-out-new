#version 300 es

precision mediump float;

in vec2 vTextureCoord;
uniform vec4 inputSize;
uniform vec4 outputFrame;

uniform vec2 lightDirs[10];
uniform vec4 lightTints[10];
uniform float lightPowers[10];
uniform float rotation;
uniform sampler2D uSampler;
uniform sampler2D uOutlineSampler;
uniform sampler2D uDarkSampler;

out vec4 fragColor;

vec4 colorCap(vec4 color){
    //float add = max(color.r-1.,0.);
    //add += max(color.g-1.,0.);
    //add += max(color.b-1.,0.);
    //add *= 0.5;
    color.r = min(color.r,1.);
    color.g = min(color.g,1.);
    color.b = min(color.b,1.);
    color.a = min(color.a,1.);
    return color;
}

void main(void){
    vec2 coords=vTextureCoord;
    vec4 base=texture(uSampler,vTextureCoord);
    vec4 outline=texture(uOutlineSampler,coords);
    vec4 dark=texture(uDarkSampler,coords);
    
    mat2 rot = mat2(cos(rotation), -sin(rotation), sin(rotation), cos(rotation));

    vec2 pos=coords.xy-vec2(.5,.5);

    vec4 total = vec4(0);
    vec4 outlineColor = vec4(0);

    for(int i = 0; i < 10; i++) {
        float power = lightPowers[i];
        if(power != 0.) {
            vec2 normLight=normalize(lightDirs[i]);
            float light = dot(pos, rot*normLight)+0.5;
            light = max(0.,min(1.,light));
            vec4 colorHere = light*lightTints[i]*lightPowers[i];
            total += colorHere;
            outlineColor += colorHere * pow(light,10.);
        }
    }
    
    outline *= outlineColor;    

    dark*=max(1.-total.a,0.);
    base*=total;


    vec4 result = vec4(0);
    //result.r = max(base.r, outline.r);
    //result.g = max(base.g, outline.g);
    //result.b = max(base.b, outline.b);
    //result.a = max(base.a, outline.a);
    result = base + outline;


    result = colorCap(result + dark);

    //fragColor=base+dark+outline;
    fragColor = result;
}