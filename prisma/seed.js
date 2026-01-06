
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const posts = [
    {
        title: "週末のビーチウォーク",
        content: "シドニーの朝は早いです。週末は近くのビーチまで散歩するのが日課になりました。空の青さと海の青さが溶け合うような景色は、いつ見ても心が洗われます。\n\n散歩の後は、お気に入りのカフェでフラットホワイトを一杯。この時間が最高のリフレッシュです。",
        image: "/images/beach.png",
        date: "2024-05-12",
        likes: 12
    },
    {
        title: "マーケットで見つけた野菜",
        content: "郊外のマーケットに行ってきました。こちらでは見たことのないような野菜もたくさん売られていて、見ているだけでワクワクします。\n\n「これはどうやって食べるの？」とお店の人に聞くと、おすすめのレシピを教えてくれました。人の温かさに触れられるのもマーケットの魅力ですね。",
        image: "/images/market.png",
        date: "2024-05-05",
        likes: 8
    },
    {
        title: "公園でのんびり読書",
        content: "大きな木の下で読書。シドニーには緑豊かな公園がたくさんあって、誰もが思い思いに過ごしています。\n\n鳥のさえずりをBGMに、時間を忘れて本の世界に没頭しました。",
        image: "/images/park.png",
        date: "2024-04-28",
        likes: 25
    },
    {
        title: "シドニーのカフェ文化",
        content: "シドニーはコーヒー文化が根付いています。朝早くから開いているカフェが多く、通勤前に立ち寄る人もたくさん。\n\n私の住むエリアにも素敵な隠れ家カフェがあります。",
        image: "/images/cafe.png",
        date: "2024-04-20",
        likes: 15
    }
];

async function main() {
    console.log('Start seeding ...');

    // Seed posts
    for (const post of posts) {
        // Check if post with same title exists to avoid duplicates
        const existingPost = await prisma.post.findFirst({
            where: { title: post.title }
        });

        if (!existingPost) {
            await prisma.post.create({
                data: post,
            });
        }
    }

    // Seed profile
    await prisma.profile.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: "シドニー在住の会社員",
            bio: "2024年4月からシドニーでの生活をスタート。\n日々の発見や、変わりゆく街の景色を\n継続的に記録していきます。",
            avatar: "🇦🇺",
        },
    });

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
